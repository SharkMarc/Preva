<?php

namespace MarcsBlog\Service;

use MarcsBlog\Node\ExclusiveGatewayNode;
use MarcsBlog\Node\Node;
use MarcsBlog\Node\ParallelGatewayNode;
use MarcsBlog\Node\StartEventNode;
use MarcsBlog\Node\SequenceFlowNode;
use MarcsBlog\Node\EndEventNode;
use MarcsBlog\Node\Task;
use SimpleXMLElement;

interface Nodes
{
	public function getNodes(SimpleXMLElement $node, string $elementType);
}

class NodeProvider implements Nodes
{

	public function getNodes(SimpleXMLElement $node, $elementType)
	{
		$list = [];

		if ($elementType === "startEvent") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute  = $elementNode->attributes();
					$startEvent = new StartEventNode((string)$attribute->id, (string)$attribute->outgoing);

					if (isset($elementNode->outgoing)) {
						$startEvent->outgoing = (string)$elementNode->outgoing;
					}
					$list["startEvent"][(string)$attribute->id] = $startEvent;
				}
			}
		}

		if ($elementType === "sequenceFlow") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute                                    = $elementNode->attributes();
					$sequenceFlow                                 = new SequenceFlowNode($attribute->id, $attribute->name, $attribute->sourceRef, $attribute->targetRef);
					$list["sequenceFlow"][(string)$attribute->id] = $sequenceFlow;
				}
			}
		}

		if ($elementType === "exclusiveGateway") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute                                        = $elementNode->attributes();
					$exclusiveGateway                                 = new ExclusiveGatewayNode((string)$attribute->id, (string)$attribute->name, (string)$elementNode->incoming, (array)$elementNode->outgoing);
					$list["exclusiveGateway"][(string)$attribute->id] = $exclusiveGateway;
				}
			}
		}

		if ($elementType === "parallelGateway") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute                                       = $elementNode->attributes();
					$parallelGateway                                 = new ParallelGatewayNode((string)$attribute->id, (string)$attribute->name, (array)$elementNode->outgoing,(array)$elementNode->incoming);
					$list["parallelGateway"][(string)$attribute->id] = $parallelGateway;
				}
			}
		}

		if ($elementType === "task") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute                            = $elementNode->attributes();
					$task                                 = new Task((string)$attribute->id, (string)$attribute->name);
					$task->outgoing                       = (string)$elementNode->outgoing;
					$task->incoming                       = (string)$elementNode->incoming;
					$list["task"][(string)$attribute->id] = $task;
				}
			}
		}

		if ($elementType === "endEvent") {
			foreach ($node as $element => $elementNode) {
				if ($element === $elementType) {
					$attribute                                = $elementNode->attributes();
					$endEvent                                 = new EndEventNode((string)$attribute->id, (string)$attribute->name, (string)$attribute->incoming);
					$list["endEvent"][(string)$attribute->id] = $endEvent;
				}
			}
		}

		return $list;
		// TODO: Implement getNodes() method.
	}
}