<?php
namespace Preva\Io;

use Preva\Element\Edge;
use Preva\Element\FakeEdge;
use Preva\Element\Node;
use Preva\Element\NodeFactory;
use Preva\Element\Prefix;
use Preva\Element\Process;

class XmlParser
{
	private const MAX_DEPTH         = 5;
	private const ROOT_NODE_NAME    = 'bpmn:definitions';
	private const PROCESS_NODE_NAME = 'bpmn:process';
	private const EDGE_NAME         = 'bpmn:sequenceFlow';
	private const INCOMING_NAME     = 'bpmn:incoming';
	private const OUTGOING_NAME     = 'bpmn:outgoing';
	private const ROOT_NODE_NAME_DEFAULT    = 'definitions';
	private const PROCESS_NODE_NAME_DEFAULT = 'process';
	private const EDGE_NAME_DEFAULT         = 'sequenceFlow';
	private const INCOMING_NAME_DEFAULT     = 'incoming';
	private const OUTGOING_NAME_DEFAULT     = 'outgoing';

	public function parse(string $filePath): Process
	{
		if (!file_exists($filePath)) {
			throw new \InvalidArgumentException(sprintf('missing file %s', $filePath));
		}

		$nodeFactory = new NodeFactory();

		$xml = \XMLReader::open($filePath);
		if (!$xml instanceof \XMLReader) {
			throw new \InvalidArgumentException(sprintf('could not open %s', $filePath));
		}
		$this->xml = $xml;

		try {
			// skip xml-version line
			$this->advanceNode();
			$prefixHelper=new Prefix;

			// check root node
			if ($xml->name !== self::ROOT_NODE_NAME) {
				$prefixHelper->setPrefix(true);
			}

			if ($prefixHelper->getPrefix()) {
				if ($xml->name !== self::ROOT_NODE_NAME_DEFAULT) {
					throw new \InvalidArgumentException('could not find root node definitions '. $xml->name);
				}

				$this->advanceNode();
				// we are interested in bpmn:process, but there are others
				while ($xml->name !== self::PROCESS_NODE_NAME_DEFAULT) {
					$this->advanceNode();
				}

				/** @var Process $process */
				$process = $nodeFactory->createNode($xml->name, $this->extractAttributes());

				// parse the rest of bpmn:process
				$this->advanceNode();
				$stack  = [$process];
				$parent = $process;
				$edges  = [];

				while ($xml->name !== self::PROCESS_NODE_NAME_DEFAULT && count($stack) < self::MAX_DEPTH) {
					if ($xml->name === $parent->tagName) {
						$parent->markAsClosed();
						array_pop($stack);
						$parent = end($stack);

						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::EDGE_NAME_DEFAULT) {
						$e             = new Edge($this->extractAttributes());
						$edges[$e->id] = $e;

						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::INCOMING_NAME_DEFAULT) {
						$parent->addIncomingEdge(FakeEdge::withTarget($xml->readString(), $parent));

						$this->advanceNode(); // closing tag
						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::OUTGOING_NAME_DEFAULT) {
						$parent->addOutgoingEdge(FakeEdge::withSource($xml->readString(), $parent));

						$this->advanceNode(); // closing tag
						$this->advanceNode();
						continue;
					}

					$node = $nodeFactory->createNode($xml->name, $this->extractAttributes());
					$parent->addChildNode($node);

					if ($xml->isEmptyElement) {
						$node->markAsClosed();
					} else {
						$stack[] = $node;
						$parent  = $node;
					}

					$this->advanceNode();
				}
			} else {
				if ($xml->name !== self::ROOT_NODE_NAME) {
					throw new \InvalidArgumentException('could not find root node '.self::ROOT_NODE_NAME);
				}

				$this->advanceNode();
				// we are interested in bpmn:process, but there are others
				while ($xml->name !== self::PROCESS_NODE_NAME) {
					$this->advanceNode();
				}
				/** @var Process $process */
				$process = $nodeFactory->createNode($xml->name, $this->extractAttributes());

				// parse the rest of bpmn:process
				$this->advanceNode();
				$stack  = [$process];
				$parent = $process;
				$edges  = [];

				while ($xml->name !== self::PROCESS_NODE_NAME && count($stack) < self::MAX_DEPTH) {
					if ($xml->name === $parent->tagName) {
						$parent->markAsClosed();
						array_pop($stack);
						$parent = end($stack);

						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::EDGE_NAME) {
						$e             = new Edge($this->extractAttributes());
						$edges[$e->id] = $e;

						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::INCOMING_NAME) {
						$parent->addIncomingEdge(FakeEdge::withTarget($xml->readString(), $parent));

						$this->advanceNode(); // closing tag
						$this->advanceNode();
						continue;
					}

					if ($xml->name === self::OUTGOING_NAME) {
						$parent->addOutgoingEdge(FakeEdge::withSource($xml->readString(), $parent));

						$this->advanceNode(); // closing tag
						$this->advanceNode();
						continue;
					}

					$node = $nodeFactory->createNode($xml->name, $this->extractAttributes());
					$parent->addChildNode($node);

					if ($xml->isEmptyElement) {
						$node->markAsClosed();
					} else {
						$stack[] = $node;
						$parent  = $node;
					}

					$this->advanceNode();
				}
			}
			if (count($stack) > 1) {
				// anything besides process
				throw new \LogicException(
					'unclosed elements: '.implode(', ', array_map(fn(Node $n) => $n->tagName, $stack))
				);
			}
		} finally {
			$this->xml->close();
		}

		$this->connectEdges($process, $edges);
		$process->allEdges = $edges;

		return $process;
	}

	/**
	 * @param Edge[] $edges
	 */
	private function connectEdges(Node $process, array $edges): void
	{
		foreach ($process->getChildNodes() as $child) {
			$realEdges = [];
			foreach ($child->getIncomingEdges() as $in) {
				if (!$in instanceof FakeEdge) {
					$realEdges[] = $in;
					continue;
				}

				if (!isset($edges[$in->id])) {
					throw new \LogicException(sprintf('missing sequence flow %s', $in->id));
				}

				$e = $edges[$in->id];
				if ($e->targetRef !== $in->targetRef) {
					throw new \LogicException(sprintf('sequence conflict for %s', $in->id));
				}

				$e->target = $in->target;

				$realEdges[] = $e;
			}
			$child->setIncomingEdges($realEdges);

			$realEdges = [];
			foreach ($child->getOutgoingEdges() as $out) {
				if (!$out instanceof FakeEdge) {
					$realEdges[] = $out;
					continue;
				}

				if (!isset($edges[$out->id])) {
					throw new \LogicException(sprintf('missing sequence flow %s', $out->id));
				}

				$e = $edges[$out->id];
				if ($e->sourceRef !== $out->sourceRef) {
					throw new \LogicException(sprintf('sequence conflict for %s', $out->id));
				}

				$e->source = $out->source;

				$realEdges[] = $e;
			}
			$child->setOutgoingEdges($realEdges);
		}
	}

	private function extractAttributes(): array
	{
		// save count, it changes during processing
		$cnt = $this->xml->attributeCount;

		$attributes = [];
		for ($i = 0; $i < $cnt; $i++) {
			$this->xml->moveToAttributeNo($i);
			$attrName              = $this->xml->name;
			$attributes[$attrName] = $this->xml->value;
		}

		// move cursor back to node
		$this->xml->moveToElement();

		return $attributes;
	}

	private function advanceNode(): void
	{
		// advance to next node
		$this->xml->read();

		while ($this->xml->name === '#text') {
			// skip text-nodes (empty lines)
			$this->xml->read();
		}
	}
}
