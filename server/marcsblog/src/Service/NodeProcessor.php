<?php

namespace MarcsBlog\Service;

use MarcsBlog\Node\Node;
use SimpleXMLElement;

class NodeProcessor
{

	public function process(SimpleXMLElement $node)
	{
		$list = [];

		foreach ($node as $element => $elementNode) {
//			if ($element === "task") {
////				var_dump($elementNode->attributes());
//				$task = new Node($elementNode->attributes()->id);
//
//				if (isset($elementNode->outgoing)) {
////					$task->outgoing=new Node($elementNode->outgoing);
//
////					$task->outgoing=new Node($elementNode["outgoing"]["name"]);
//					$task->outgoing = $elementNode->outgoing;
//				}
//				if (isset($elementNode->incoming)) {
//					$task->incoming = new Node($elementNode->incoming);
//					$task->outgoing = $elementNode->outgoing;
//				}
//			}
//
//			if ($element === "exclusiveGateway") {
//
//				var_dump($elementNode->attributes());
//				$exclusiveGateway = new Node($elementNode->attributes()->id);
//
//				var_dump($exclusiveGateway);
//			}

		}
		$list[] = $task;
		$list[] = $exclusiveGateway;
		var_dump($list);

		return $list;
	}

}