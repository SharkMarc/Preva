<?php
namespace Preva\Element;

class NodeFactory
{
	private const TAG_TO_CLASS = [
		'bpmn:process'          => Process::class,
		'bpmn:startEvent'       => StartEvent::class,
		'bpmn:endEvent'         => EndEvent::class,
		'bpmn:task'             => Task::class,
		'bpmn:sequenceFlow'     => SequenceFlow::class,
		'bpmn:exclusiveGateway' => ExclusiveGateway::class,
		'bpmn:parallelGateway'  => ParallelGateway::class,
		'bpmn:inclusiveGateway' => InclusiveGateway::class,
	];

	private const TAG_TO_CLASS_NO_PREFIX = [
		'process'          => Process::class,
		'startEvent'       => StartEvent::class,
		'endEvent'         => EndEvent::class,
		'task'             => Task::class,
		'sequenceFlow'     => SequenceFlow::class,
		'exclusiveGateway' => ExclusiveGateway::class,
		'parallelGateway'  => ParallelGateway::class,
		'inclusiveGateway' => InclusiveGateway::class,
	];

	public function createNode(string $tagName, array $attributes = []): Node
	{
		$self = self::TAG_TO_CLASS;
		if (!isset($self[$tagName])) {
			$self = self::TAG_TO_CLASS_NO_PREFIX;
			if (!isset($self[$tagName])) {
				throw new \UnexpectedValueException(sprintf('Could not determine node class for %s', $tagName));
			}
		}
		$className = $self[$tagName];

		$node = new $className();
		if (!$node instanceof Node) {
			throw new \RuntimeException(sprintf('%s must extend %s', $className, Node::class));
		}

		$node->tagName = $tagName;

		foreach ($node->getRequiredAttributes() as $attr) {
			if (!isset($attributes[$attr])) {
				throw new \DomainException(sprintf('missing attribute %s', $attr));
			}
		}

		foreach ($attributes as $name => $value) {
			if (property_exists($node, $name)) {
				$node->$name = $value;
			}
		}

		return $node;
	}

	public function supports(string $tagName): bool
	{
		$PrefixHelper = new Prefix;
		if ($PrefixHelper->getPrefix()) {
			$self = self::TAG_TO_CLASS;
		} else {
			$self = self::TAG_TO_CLASS_NO_PREFIX;
		}

		return isset($self[$tagName]);
	}
}
