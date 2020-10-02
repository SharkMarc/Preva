<?php

namespace MarcsBlog\Service;

use MarcsBlog\Node\Node;
use SimpleXMLElement;

class NodeProcessor
{
	public function process(SimpleXMLElement $node){
		$list = [];
		foreach ($node as $element => $elementNode) {
			var_dump($element);
			var_dump($elementNode);
			if($element==="task"){
				var_dump($elementNode->attributes());
				$task=new Node($elementNode->attributes()->id);

				if(isset($elementNode->outgoing)){
					$task->outgoing=new Node($elementNode["outgoing"]["name"]);
					var_dump($task);
				}
				exit;
			}

		}
		die("you failed");
		return $list;
	}

}