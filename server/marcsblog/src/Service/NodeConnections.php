<?php

namespace MarcsBlog\Service;

use ArrayObject;
use MarcsBlog\Node\ExclusiveGatewayNode;
use MarcsBlog\Node\SequenceFlowNode;
use MarcsBlog\Node\StartEventNode;
use SimpleXMLElement;

class NodeConnections extends NodeProvider
{

	public function handleStartEvent($taskWays, $outgoingList, $startEvent)
	{

//		prepare startEvent
		foreach ($startEvent as $element) {
			$outgoingName                       = $element->outgoing;
			$taskWays["startEvent"]["id"]       = (string)$element->id;
			$taskWays["startEvent"]["name"]     = (string)$element->name;
			$taskWays["startEvent"]["outgoing"] = (string)$outgoingName;
			$outgoingList[]                     = (string)$outgoingName;
		}

		return [$taskWays, $outgoingList];
	}

	public function findEndEvent($endEvent, $targetRef): array
	{
		$endOfTheJourney          = [];
		$endOfTheJourney["isEnd"] = false;
		foreach ($endEvent as $endElement) {
			if ($endElement->id === $targetRef) {
				$endOfTheJourney["endEvent"] = $targetRef;
				$endOfTheJourney["isEnd"]    = true;
			}
		}

		return $endOfTheJourney;
	}

	function checkSequenceFlows($sequenceFlows, $outgoingName): array
	{
		$list     = [];
		$newArray = [];

//		problems cus sometimes it is an array and sometimes string
		if (is_array($outgoingName)) {
			$newArray = $outgoingName;
		} else {
			$newArray[] = $outgoingName;
		}

		foreach ($sequenceFlows as $sequenceFlow) {
			if ((string)$sequenceFlow->id === $newArray[0]) {
				$sourceRef = (string)$sequenceFlow->sourceRef;
				$targetRef = (string)$sequenceFlow->targetRef;
				$taskWay   = (string)$sequenceFlow->targetRef;
				$id        = (string)$sequenceFlow->id;

				$list["targetRef"] = $targetRef;
				$list["taskWay"]   = $taskWay;
				$list["sourceRef"] = $sourceRef;
				$list["id"]        = $id;
			}
		}

		return $list;
	}

// check if it is really the sequence flow from -> to
	function checkValidSequenceFlow($exclusiveGateways, $targetRef, $outgoingName, $sourceRef): array
	{
		$checkGateWay            = [];
		$checkGateWay["isValid"] = false;

		foreach ($exclusiveGateways as $exclusiveGateway) {

			if ($exclusiveGateway->id === $targetRef) {
				foreach ($outgoingName as $element) {
					if ($exclusiveGateway->incoming->id === $element) {
						$checkGateWay["targetExclusiveGateway"] = $exclusiveGateway;
						$checkGateWay["isValid"]                = true;
						break;
					}
				}
			}
		}

		return $checkGateWay;
	}

	function checkEndEvent($endEvent, $targetRef): array
	{
		$endOfTheJourney          = [];
		$endOfTheJourney["isEnd"] = false;
		foreach ($endEvent as $endElement) {
			if ($endElement->id === $targetRef) {
				$endOfTheJourney["endEvent"] = $targetRef;
				$endOfTheJourney["isEnd"]    = true;
			}
		}

		return $endOfTheJourney;
	}

	public function searchTargetRef($target, $exclusiveGateways, $parallelGateways, $task, $endEvent, $request)
	{

		$type    = "";
		$nodeKey = "";

		foreach ($exclusiveGateways as $exclusiveGateway) {
			foreach ($exclusiveGateway as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($exclusiveGateway); $i++) {
						if ($target === $key) {
							$type    = "exclusiveGateway";
							$nodeKey = $key;
							$node    = $value;
						}
					}
				}
			}
		}

		foreach ($parallelGateways as $parallelGateway) {
			foreach ($parallelGateway as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($parallelGateway); $i++) {
						if ($target === $key) {
							$type    = "parallelGateway";
							$nodeKey = $key;
							$node    = $value;
						}
					}
				}
			}
		}

		foreach ($task as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type    = "task";
							$nodeKey = $key;
							$node    = $value;
						}
					}
				}
			}
		}

		foreach ($endEvent as $singleEndEvent) {
			foreach ($singleEndEvent as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleEndEvent); $i++) {
						if ($target === $key) {
							$type    = "endEvent";
							$nodeKey = $key;
							$node    = $value;
						}
					}
				}
			}
		}
		if ($request === "type") {
			return $type;
		}
		if ($request === "key") {
			return $nodeKey;
		}

		return $node;
	}

	public function addMeToYourList($list, $element)
	{

		return $element;
	}

	public function handleExclusiveGateway($target, $exclusiveGateways, $task, $endEvent, $sequenceFlows, $outgoingList)
	{
		$targetList = [];
		foreach ($exclusiveGateways as $element) {
			if ($element->id === $target) {

				if (count($element->outgoing) !== 1) {
					foreach ($element->outgoing as $newTarget) {

						//finde sequenceflow und dann wieder was ist es
						$neuerSequenceflow = $this->checkSequenceFlows($sequenceFlows, $newTarget);

						$targetRef = $neuerSequenceflow["targetRef"];

						$targetList[$targetRef]["targetRef"] = $neuerSequenceflow["targetRef"];
						$targetList[$targetRef]["type"]      = $this->searchTargetRef($neuerSequenceflow["targetRef"], $exclusiveGateways, $task, $endEvent);
					}
				}
			}
		}

		return $targetList;
	}

	public function oneDirection($element, $exclusiveGateways, $task, $endEvent)
	{
//      egal welcher type solange nur ein outgoing oder keins mehr dorthin nice
//		adde das nächste outgoing Element was du findest

		$type = $this->searchTargetRef($element, $exclusiveGateways, $task, $endEvent);

		if ($type === "endEvent") {
			foreach ($endEvent as $endNode) {
				if ($endNode->id === $element) {
					return $endNode;
				}
			}
		}

		return false;
	}

	public function useMeAllThetime($type, $arraySequenceFlows, $exclusiveGateways, $taskNode, $endEvent, $sequenceFlows, $outgoingList, $list, $endList)
	{

		if ($type === "exclusiveGateway") {
			$outgoingTypes = $this->handleExclusiveGateway($arraySequenceFlows["targetRef"], $exclusiveGateways, $taskNode, $endEvent, $sequenceFlows, $outgoingList);

			foreach ($outgoingTypes as $element) {
//				$element = $this->searchTargetRef($type, $exclusiveGateways, $taskNode, $endEvent);

//				what to do now? i have type x and y so we have to split ! lets go on with one way x
//				what to do if element type is endevent => final
				if ($element["type"] === "task") {
					$list2          = $list;
					$listOfOutoings = [];

					foreach ($taskNode as $task) {
						if ($task->id === $element["targetRef"]) {
							$list[] = $task;

//							Finde wer Flow_05hc1iw als id hat also den sequenzflow
							$sequenceFlow = $this->checkSequenceFlows($sequenceFlows, $task->outgoing);

//							foreach ($task->outgoing as $outgoing) {
//								$listOfOutoings[] = $outgoing;
//								var_dump($listOfOutoings);
//							}
						}
					}
//					$getTaskNode=$this->searchTargetRef($element["targetRef"], $exclusiveGateways, $taskNode, $endEvent);
//					var_dump($list);
				}

				if ($element["type"] === "endEvent") {
					$finalNode = $this->oneDirection((string)$element["targetRef"], $exclusiveGateways, $taskNode, $endEvent);
					$list2     = $list;
					$list2[]   = $finalNode;
					$endlist[] = $list2;
//					var_dump("ENDEVENT LISIE!!!!!");
//					var_dump($endlist);

				}
			}
		}

		return [$endList, $list];
	}

	public function hasOutgoing($node)
	{

		foreach ($node as $nodeKey => $nodeValue) {
			if ($nodeKey === "hasOutgoing" && $nodeValue) {
				return true;
			}
		}

		return false;
	}

	public function findSequenceFlow($sequenceFlows, $outgoingList)
	{
		foreach ($sequenceFlows as $sequenceFlow) {
			foreach ($sequenceFlow as $key => $value) {
				if ($key === $outgoingList) {

//					var_dump($outgoingList);

					return $value;
				}
			}
		}

		return var_dump("i did a mistake");
	}

	public function handleFindRefTarget($sequenceflow)
	{
		foreach ($sequenceflow as $key => $value) {
			if ($key === "targetRef") {
				return $value;
			}
		}

		return dd("wrong");
	}

	public function findOutGoings($node, $notStartEvent)
	{
		$outgoingList = [];
		foreach ($node as $onlyObject) {
			if (!$notStartEvent) {
				foreach ($onlyObject as $key => $value) {
					if ($key === "outgoing" && !$notStartEvent) {
						$outgoingList[] = $value;
					}
				}
			} else {

				$outgoingList = $node->outgoing;
//				$outgoingList = $onlyObject;
			}
		}

		if (is_array(!$outgoingList) && $outgoingList) {
			$newList      = [];
			$newList[]    = $outgoingList;
			$outgoingList = $newList;
		}

		return $outgoingList;
	}

	public function buildTree($node, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent)
	{

//		ich rufe mich selbst auf unter bedingung when astgabel for each do while ansonsten linear

//		check outgoing

		$hasOutgoing = $this->hasOutgoing($node);

		while ($hasOutgoing) {

			if (is_array($node->outgoing)) {
				$countedOutogings = count($node->outgoing);
				$countedIncomings = count($node->incoming);
				$outgoings        = $node->outgoing;
				$incomings        = $node->incoming;

				if ($node->type === "exclusiveGateway") {
					for ($i = 0; $i < $countedOutogings; $i++) {
						$outgoings[$i];
						$sequenceFlow       = $this->findSequenceFlow($sequenceFlows, $outgoings[$i]);
						$node->outgoing[$i] = [$sequenceFlow->id => $sequenceFlow];

						$findRefTargetId         = $this->handleFindRefTarget($sequenceFlow);
						$nextNode                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "node");
						$nextKey                 = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "key");
						$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "type");
						$sequenceFlow->targetRef = $nextKey;

						foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
							$sequenceFlow->targetRef = [$nextKey => $nextNode];
						}

						foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
							if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
								$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent);
							}
						}
					}
				} elseif ($node->type === "parallelGateway") {
					for ($i = 0; $i < $countedOutogings; $i++) {
						$outgoings[$i];
						$sequenceFlow       = $this->findSequenceFlow($sequenceFlows, $outgoings[$i]);
						$node->outgoing[$i] = [$sequenceFlow->id => $sequenceFlow];

						$findRefTargetId         = $this->handleFindRefTarget($sequenceFlow);
						$nextNode                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "node");
						$nextKey                 = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "key");
						$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "type");
						$sequenceFlow->targetRef = $nextKey;

						foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
							$sequenceFlow->targetRef = [$nextKey => $nextNode];
						}
						foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
							if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
								$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent);
							}
						}
					}
				}
			} else {
				$sequenceFlow   = $this->findSequenceFlow($sequenceFlows, $node->outgoing);
				$node->outgoing = [$sequenceFlow->id => $sequenceFlow];

				$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
				$nextNode        = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "node");

				$nextKey                 = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "key");
				$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $endEvent, "type");
				$sequenceFlow->targetRef = $nextKey;

				foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
					$sequenceFlow->targetRef = [$nextKey => $nextNode];
				}
				foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
					if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
						$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent);
					}
				}
				if ($nextType === "parallelGateway") {
					var_dump("check ob in liste dann mach hier weiter");
					var_dump(count($nextNode->incomings));
					for($i=0;$i<$nextNode->incomings;$i++){

					}
				}
			}
			$hasOutgoing = false;
		}
		var_dump($node);
	}

	public function outGoingTo($startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent)
	{
		$taskWays     = [];
		$outgoingList = [];
		$list         = [];
		$endlist      = [];
		$lastNode     = [];
		$hasOutgoing  = false;
		$blatt        = [];
		$baum         = [];
		$nodeList     = [];

		$outgoingAmount = 0;
		$getStartValues = $this->handleStartEvent($taskWays, $outgoingList, $startEvent);
//		set start event
		foreach ($startEvent as $startKey => $startValue) {
			$nodeList = $startValue;
			$node     = $startValue;
			$baum     = $startValue;
		}
		foreach ($baum as $baumKey => $baumValue) {
			$test = $this->buildTree($baumValue, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $endEvent);
		}
		var_dump("ENDE");
		var_dump($test);
//		var_dump($node2);
////		//		adde startevent ein sequence
////		$hasOutgoing2 = $this->hasOutgoing($node2, false);
////		$outgoingList2 = $this->findOutGoings($node, false);
////		for($i=0;$i<count($outgoingList2);$i++){
////			$sequenceFlow2[$i] = $this->findSequenceFlow($sequenceFlows, $outgoingList2[$i]);
////		}
////		var_dump($sequenceFlow2);
////		var_dump("hier nicht broken");
////
////		if ($hasOutgoing2) {
////			unset($node2->outgoing);
////		$node2->outgoing=$sequenceFlow2;
////		}
////var_dump("hier");
////var_dump($node2);
//
////		$node2->outgoing = $sequenceFlow2;
//
////		und speichere targetRef von sequence
//
////		add sequence target und geb startevent aus
////		adde startevent ein sequence
////		adde startevent ein sequence
////		adde startevent ein sequence
//
////		WIR BETRACHTEN NUR EINEN FALL ERSTMAL
//
////		$bpmnList    = $startValue;
////		$hasOutgoing = $this->hasOutgoing($node, false);
//
////		do {
////			if ($hasOutgoing) {
////				if ($wasHere) {
////					$node = $nextNode;
////				}
////
////				$outgoingList = $this->findOutGoings($node, $wasHere);
////
////				if (is_string($outgoingList)) {
////					$isNowAnArray[] = $outgoingList;
////					$outgoingList   = $isNowAnArray;
////				}
////
////				if (count($outgoingList) === 1) {
////					//get sequence and find id
////					$sequenceFlow    = $this->findSequenceFlow($sequenceFlows, $outgoingList[0]);
////					$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
////
////					//get next node, nodetype and nodekey
////					$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "node");
////					$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "key");
////					$nextType = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "type");
////					//add sequence and outgoing
////					$bpmnList[$sequenceFlow->id] = $sequenceFlow;
////					$bpmnList[$nextKey]          = $nextNode;
////
////					$hasOutgoing = $this->hasOutgoing($nextNode, true);
////				} else {
////					$safeMultipleOutgoingHolder = $node;
////					$safeMultipleOutgoingKey    = $findRefTargetId;
////					$moreOutgoings              = false;
//////					jedes mal wenn ich hier reingehe muss ich dieses eine object bis zum ende machen danach erst das nächste
////
////					for ($o = 0; $o < count($outgoingList); $o++) {
////						do {
////							//get sequence and find id
////							if ($moreOutgoings) {
////								$moreSequencesStarter = $sequenceFlow;
//////								var_dump($moreSequencesStarter);
////								if (is_string($moreOutgoings)) {
////									$sequenceFlow = $this->findSequenceFlow($sequenceFlows, $moreOutgoings);
////
////									$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
//////                                  get next node, nodetype and nodekey
////									$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "node");
////									$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "key");
////									$nextType = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "type");
//////									$moreSequencesStarter->outgoing[$sequenceFlow->id] = $sequenceFlow;
////									$hasOutgoing = $this->hasOutgoing($nextNode, true);
////
//////									$moreSequencesStarter->targetRef->outgoing = $sequenceFlow;
////									$sequenceFlow->targetRef = $nextNode;
////								} else {
////									for ($m = 0; $m < count($moreOutgoings); $m++) {
//////									var_dump($moreOutgoings[$m]);
////
////										$sequenceFlow = $this->findSequenceFlow($sequenceFlows, $moreOutgoings[$m]);
////
////										$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
//////                                      get next node, nodetype and nodekey
////										$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "node");
////										$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "key");
////
////										$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "type");
////										$sequenceFlow->targetRef = $nextNode;
////										if ($nextType === "exclusiveGateway") {
////
//////											var_dump($exclusiveGateways->getName($nextKey));
//////											get_object_vars ( $this->getNodes($nextNode) );
//////                                          foreach element ne liste durchgehen alle (ab 2+ abspeichern) => bis ende erstes element durchgehen abspeichern
//////                                          falls auf dem weg des ersten elements wieder ein xor vorkommt => liste.i => i++
//////                                          alle listen in eine lsite abspeichern???
//////											wenn fertig dann zu letzter eingespeicherte liste springen dort zweiten weg gehen usw.
////
//////											d.h. einfach = durchgehen sequence node adden bis ende.
//////											auf dem weg gefundenes xor erstes element wie zuvor zweites element zwischenspeichern frage ist wie kann ich wieder dorthin
////
////										}
//////										$moreSequencesStarter->outgoing[$sequenceFlow->id] = $sequenceFlow;
//////										$moreSequencesStarter->nextKey = $nextNode;
////										if ($nextType === "exclusiveGateway") {
////										}
////									}
////								}
////								if (is_string($moreOutgoings)) {
////									$moreOutgoings = false;
////								}
////								$moreSequencesStarter = $sequenceFlow;
//////								repeat all this for do; copy paste is no option
//////								$sequenceFlow = $this->findSequenceFlow($sequenceFlows, $moreOutgoings[0]);
////							} else {
////								$sequenceFlow = $this->findSequenceFlow($sequenceFlows, $outgoingList[$o]);
////
////								$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
////
////								//get next node, nodetype and nodekey
////								$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "node");
////								$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "key");
////								$nextType = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $taskNode, $endEvent, "type");
////							}
//////							$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);
////
////							if (isset($nextNode)) {
////								$sequenceFlow->targetRef = $nextNode;
////							}
////
//////							check if more outgoings or standard
////							if ($moreOutgoings) {
////							} else {
////								$node->outgoing[$sequenceFlow->id] = $sequenceFlow;
////							}
////
////							unset($node->outgoing[$o]);
////
////							$hasOutgoing = $this->hasOutgoing($nextNode, true);
////
////							if ($hasOutgoing) {
////								if ($moreOutgoings) {
////									$moreOutgoings = $this->findOutGoings($nextNode, $wasHere);
//////									$outgoingList=[];
////								} else {
////									$moreOutgoings[] = $this->findOutGoings($nextNode, $wasHere);
//////									$outgoingList=[];
////
////								}
////							} else {
////								$moreOutgoings = false;
////							}
////						} while ($nextNode->hasOutgoing);
////					}
////				}
////
////				//check if one more round
////				if (count($outgoingList) !== 1) {
////					$hasOutgoing = false;
////				}
////				$wasHere = true;
////			}
////		} while ($hasOutgoing);
//
//		var_dump($bpmnList);
//
////		find targetRef from sequenceFlows
//		foreach ($lastNode as $key => $value) {
//			if ($key === "targetRef") {
//				$newTargetRef = $value;
//			}
//		}
//
////		find by id new tartget
//
////		$type               = $this->searchTargetRef($newTargetRef, $exclusiveGateways, $taskNode, $endEvent);
////		$arraySequenceFlows = $this->checkSequenceFlows($sequenceFlows, $newTargetRef);
////
////		$nodeType = $type[0];
////		$newNode  = $type[1];
////
////		if ($newNode->incoming === $lastNode->id) {
////			$lastNode->targetRef = $newNode;
////		}
////		$lastNode = $newNode;
////		$newNode  = [];
////
////		$outgoingList = [];
////		foreach ($lastNode as $key => $value) {
////			if ($key === "outgoing") {
////				for ($i = 0; $i < count($value); $i++) {
////					$outgoingList[] = $value[$i];
////				}
////			}
////
//////			find sequenceFlow
////			foreach ($sequenceFlows as $sequenceFlowValue) {
////				foreach ($sequenceFlowValue as $sequenceFlow) {
////					for ($i = 0; $i < count($outgoingList); $i++) {
////						if ($sequenceFlow->id === $outgoingList[$i]) {
////							$lastNode->outgoing[$sequenceFlow->id] = $sequenceFlow;
////							$newNode[]                             = $sequenceFlow;
////						}
////					}
////				}
////			}
////		}
//
////		get both sequence Flow
////		find targetRef from sequenceFlows
////		foreach ($lastNode as $key => $value) {
////			if ($key === "targetRef") {
////				$newTargetRef = $value;
////			}
////		}
////		var_dump($lastNode);
//
////		 WHAT TO DO?
////      alle startEvents holen Schritt eins
////		Outgoing danach RefTarget
////      die Frage ist danach nochmal outgoing zu finden wenn ja wiederholen else endevent
//
////		$findNextnode;
////		$type = $this->searchTargetRef($findSequenceFlow, $exclusiveGateways, $taskNode, $endEvent);
////		switch ($type) {
////			case "exclusiveGateway";
////				foreach ($exclusiveGateways as $element) {
////					if ($element->id === $findNextNode) {
////						var_dump("drinnen!");
////						$newExclusiveGatewayNode = new ExclusiveGatewayNode($element->id, $element->name, $element->incoming, $element->outgoing);
////						var_dump($newExclusiveGatewayNode);
////						$node           = $element;
////						$outgoingAmount = count($node->outgoing);
////						$node->xor      = [];
////						$list[]         = $node;
////					}
////				}
////			break;
////			case "endEvent";
////				foreach ($endEvent as $element) {
////					if ($element->id === $arraySequenceFlows["targetRef"]) {
//////								add end event and stop here for this list
////						var_dump("now end it");
////					}
////				}
////			break;
////
////			case "";
////				var_dump("EERROOOOOOOOOOOOOR");
////			break;
////		}
////		if($findSequenceFlow)
//
//		$taskWays       = $getStartValues[0];
//		$outgoingList   = $getStartValues[1];
//		$outgoingAmount = count($outgoingList);
//
////			wohin geht der outgoing?
////		do {
////			if ($outgoingAmount === 1) {
////				$list[]             = $this->addMeToYourList($list, $getStartValues[0]);
////				$arraySequenceFlows = $this->checkSequenceFlows($sequenceFlows, $outgoingList);
////				$list[]             = $arraySequenceFlows;
////				$type               = $this->searchTargetRef($arraySequenceFlows["targetRef"], $exclusiveGateways, $taskNode, $endEvent);
////
//////			add next element
////				$callSwitch = "heir bitte sitch funktion erstellen";
////
////				switch ($type) {
////					case "exclusiveGateway";
////						foreach ($exclusiveGateways as $element) {
////							if ($element->id === $arraySequenceFlows["targetRef"]) {
////								$node           = $element;
////								$outgoingAmount = count($node->outgoing);
////								$node->xor      = [];
////								$list[]         = $node;
////							}
////						}
////					break;
////					case "endEvent";
////						foreach ($endEvent as $element) {
////							if ($element->id === $arraySequenceFlows["targetRef"]) {
//////								add end event and stop here for this list
////								var_dump("now end it");
////							}
////						}
////				}
////			}
////
//////				$a = $this->useMeAllThetime($type, $arraySequenceFlows, $exclusiveGateways, $taskNode, $endEvent, $sequenceFlows, $outgoingList, $list, $endlist);
////
////			if ($outgoingAmount > 1) {
////				$a                  = 0;
////				$findSequenceFlows  = [];
////				$arraySequenceFlows = [];
////
//////				wir brauchen für die anzahl der outgoing amounts listen um hier weiter zu gehen
////				for ($i = 0; $i < $outgoingAmount; $i++) {
////					$newDirectionList              = $node->outgoing[$i];
////					$newDirectionList              = (string)$newDirectionList[0][0];
////					$lastElement                   = count($list);
////					$list[$lastElement - 1]->xor[] = $newDirectionList;
////					$a                             = $i;
////					$findSequenceFlows[$i]         = $newDirectionList;
////				}
////
//////				getting all sequence flows
////				for ($f = 0; $f <= $a; $f++) {
////					$arraySequenceFlows[] = $this->checkSequenceFlows($sequenceFlows, $findSequenceFlows[$f]);
//////					hab alle sequence flows im array and now what ?
//////					ich möchte dass dem string mit dem xor target das richtige array angehängt wird und dem näcshten das nächste etc.
////				}
////
//////				find xors and add right id and sequence flow to list
////				for ($i = 0; $i < count($list[$lastElement - 1]->xor); $i++) {
////					for ($a = 0; $a < count($arraySequenceFlows); $a++) {
////						$getSequenceFlow = $arraySequenceFlows[$a]["id"];
////
////						if ($list[$lastElement - 1]->xor[$i] === $getSequenceFlow) {
////							$list[$lastElement - 1]->xor[$i] = $arraySequenceFlows[$a];
////						}
////					}
////				}
////				$finalList = $list;
//////				$outgoingAmount=-1 für switch erstellen
////				$outgoingAmount = 0;
//////				var_dump("outgoingAmount");
//////				var_dump($outgoingAmount);
////
//////				targets hinzufügen und switch aufrufen
//////				zwei xors sind bereit targets zu finden
////
////			}
//////          beginn von neuem und bekomme ersten target ref neue liste lets go
////			if ($outgoingAmount === -1) {
////				$outgoingAmount=0;
////				break;
////				var_dump("reset and get last sequence flows");
////
////				for ($i = 0; $i < count($arraySequenceFlows); $i++) {
////					var_dump($arraySequenceFlows[$i]);
////					$type = $this->searchTargetRef($arraySequenceFlows[$i]["targetRef"], $exclusiveGateways, $taskNode, $endEvent);
////
////					switch ($type) {
////						case "exclusiveGateway";
////							foreach ($exclusiveGateways as $element) {
////								if ($element->id === $arraySequenceFlows[$i]["targetRef"]) {
////									$node           = $element;
////									$outgoingAmount = count($node->outgoing);
////									$node->xor      = [];
////									$list[]         = $node;
////								}
////							}
////						break;
////
////						case "task";
////							var_dump("hier ist ein task vorhanden");
////						break;
////
////						case "endEvent";
////							foreach ($endEvent as $element) {
////								if ($element->id === $arraySequenceFlows[$i]["targetRef"]) {
////									var_dump($element);
////									$a = in_array($arraySequenceFlows[$i]["id"], $finalList);
//////								add end event and stop here for this list
////									var_dump($a);
////									var_dump("now end it");
////								}
////							}
////						break;
////					}
////				}
////
////				$outgoingAmount = 0;
////			}
////			$outgoingAmount=0;
////			var_dump("final list", $finalList);
////		} while ($outgoingAmount !== 0);
//
////		var_dump($list);
//
////		var_dump("liste: ", $list);
////		var_dump($type);
////			finde sequenceflow mit der id === outgoing name und suche target ref
//		$list[] = $this->addMeToYourList($list, $arraySequenceFlows);
//
////			var_dump($arraySequenceFlows);
////			je nachdem was es ist anderen weg einschlagen unterscheidungen sind bis jetzt: exclusive gateway endevent und task
////			schau was der target ref ist
//
////			ich hab die idee wo ist gateway?
////			var_dump($arraySequenceFlows["targetRef"]);
//
////			erstelle eine function die das element findet und zurück gibt was es ist
//
////		$type = $this->searchTargetRef($arraySequenceFlows["targetRef"], $exclusiveGateways, $taskNode, $endEvent);
//
////			entweder oder => wir wissen zwei wege also liste copieren?
//
////			ich bin ein task tuhe das:
//
////			ich bin ein exclusive gateway tuhe das:
//		$a = $this->useMeAllThetime($type, $arraySequenceFlows, $exclusiveGateways, $taskNode, $endEvent, $sequenceFlows, $outgoingList, $list, $endlist);
////			ich bin ein endevent tuhe das:
//		if ($type === "endEvent") {
//
////$taskWays["xor"]
////				$endEvent=$this->findEndEvent($endEvent, $outgoingTypes);
//
//		}
////
////		var_dump($outgoingTypes);
////		var_dump("ein outgoing startevent");
//
////		prepare task
//		foreach ($taskNode as $element) {
//			$outgoingName                 = $element->outgoing;
//			$incomingName                 = $element->incoming;
//			$taskWays["task"]["id"]       = (string)$element->id;
//			$taskWays["task"]["name"]     = (string)$element->name;
//			$taskWays["task"]["outgoing"] = (string)$outgoingName;
//			$taskWays["task"]["incoming"] = (string)$incomingName;
//
//			$outgoingList[] = (string)$outgoingName;
//		}
//
//		$arraySequenceFlows = $this->checkSequenceFlows($sequenceFlows, $outgoingList);
//
//		$targetRef  = $arraySequenceFlows["targetRef"];
//		$sourceRef  = $arraySequenceFlows["sourceRef"];
//		$taskWays[] = $arraySequenceFlows["taskWay"];
//
//		$checkGateWay = $this->checkValidSequenceFlow($exclusiveGateways, $targetRef, $outgoingList, $sourceRef);
//
//		if (!$checkGateWay["isValid"]) {
////			dd("idiot");
//		}
//
//		$furtherOutgoings = [];
////		foreach ($checkGateWay["targetExclusiveGateway"]->outgoing as $outgoing) {
////			$furtherOutgoings[] = (string)$outgoing;
////		}
////
////		if (count($furtherOutgoings) > 1) {
//////			var_dump("obacht mehrere outgoings diggi");
////			$outgoingAmount = [];
////			$realTaskWays   = $taskWays;
////			foreach ($furtherOutgoings as $o => $oValue) {
////				//variante 1.1 bis in die ~+
////				$outgoingAmount["Variante.".($o + 1)] = $this->checkSequenceFlows($sequenceFlows, $oValue);
////
////				$newTargetRef = $outgoingAmount["outgoing_".($o + 1)]["targetRef"];
////				$checkEnd     = $this->checkEndEvent($endEvent, $newTargetRef);
////
////				$taskWays = $realTaskWays;
////				if ($checkEnd["isEnd"]) {
////					$outgoingAmount["outgoing_".($o + 1)] = $checkEnd["endEvent"];
////					$taskWays[]                           = "outgoing_".($o + 1);
////				} else {
////					var_dump("immer hübsch weiter machen aber bedenke: du brauchst ne loop dafür sonst tippste dich tot");
////				}
////
//////				var_dump($taskWays);
//////				var_dump("mitte");
////				$taskWays[]               = $oValue;
////				$taskWays[]               = $outgoingAmount["outgoing_".($o + 1)];
////				$taskWaysMultipleWays[$o] = $taskWays;
////			}
////		} else {
////			var_dump("hier darf ich nicht rein !");
////			$this->checkSequenceFlows($sequenceFlows, $furtherOutgoings);
////		}
////		var_dump("finales ende");
//
////		var_dump($taskWaysMultipleWays);
//
////		return $taskWaysMultipleWays;
		return $nodeList;
	}
}