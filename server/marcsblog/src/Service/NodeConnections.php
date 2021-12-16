<?php

namespace MarcsBlog\Service;

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

	public function searchTargetRef($target, $exclusiveGateways, $parallelGateways, $task, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, $request)
	{
		$type        = "";
		$nodeKey     = "";
		$spezialType = "";

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
							$type        = "task";
							$spezialType = "task";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($businessRuleTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "businessRuleTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($callActivity as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "callActivity";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($manualTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "manualTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($receiveTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "receiveTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($sendTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "sendTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($scriptTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "scriptTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($serviceTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "serviceTask";
							$nodeKey     = $key;
							$node        = $value;
						}
					}
				}
			}
		}

		foreach ($userTask as $singleTask) {
			foreach ($singleTask as $key => $value) {
				if ($key === $target) {
					for ($i = 0; $i < count($singleTask); $i++) {
						if ($target === $key) {
							$type        = "task";
							$spezialType = "userTask";
							$nodeKey     = $key;
							$node        = $value;
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

	public function buildTree($node, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask,
	                          $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent)
	{
//		ich rufe mich selbst auf unter der bedingung when astgabel for each do while ansonsten linear

		$insideOfExclusive = false;

//		check outgoing
		$hasOutgoing = $this->hasOutgoing($node);

		while ($hasOutgoing) {
			if (is_array($node->outgoing)) {
				$countedOutogings = count($node->outgoing);
				$outgoings        = $node->outgoing;
				$countedIncomings = count($node->incoming);
				$incomings        = $node->incoming;

				if ($node->type === "exclusiveGateway") {
					if (count($countedIncomings) > 1) {
						for ($i = 0; $i < $incomings; $i++) {
							if ($i > 0) {
								$sequenceFlow       = $this->findSequenceFlow($sequenceFlows, $node->outgoing[$i]);
								$node->outgoing[$i] = [$sequenceFlow->id => $sequenceFlow];
								$findRefTargetId    = $this->handleFindRefTarget($sequenceFlow);

								$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "node");
								$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "key");
								$nextType = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "type");

								$sequenceFlow->targetRef = $nextKey;

								foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
									$sequenceFlow->targetRef = [$nextKey => $nextNode];
								}

								foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
									if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
										$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent);
									}
								}
							}
						}
					}
					if (count($countedOutogings) > 1) {
						for ($i = 1; $i < $countedOutogings; $i++) {
							$sequenceFlow       = $this->findSequenceFlow($sequenceFlows, $outgoings[$i]);
							$node->outgoing[$i] = [$sequenceFlow->id => $sequenceFlow];

							$findRefTargetId         = $this->handleFindRefTarget($sequenceFlow);
							$nextNode                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask,
								$callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "node");
							$nextKey                 = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "key");
							$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "type");
							$sequenceFlow->targetRef = $nextKey;

							foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
								$sequenceFlow->targetRef = [$nextKey => $nextNode];
							}

							foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
								if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
									$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent);
								}
							}
						}
					}
				} elseif ($node->type === "parallelGateway") {
					for ($i = 0; $i < $countedOutogings; $i++) {
						$sequenceFlow       = $this->findSequenceFlow($sequenceFlows, $outgoings[$i]);
						$node->outgoing[$i] = [$sequenceFlow->id => $sequenceFlow];

						$findRefTargetId         = $this->handleFindRefTarget($sequenceFlow);
						$nextNode                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "node");
						$nextKey                 = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "key");
						$nextType                = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "type");
						$sequenceFlow->targetRef = $nextKey;

						foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
							$sequenceFlow->targetRef = [$nextKey => $nextNode];
						}
						foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
							if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
								$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent);
							}
						}
					}
				}
			} else {
				$sequenceFlow    = $this->findSequenceFlow($sequenceFlows, $node->outgoing);
				$node->outgoing  = [$sequenceFlow->id => $sequenceFlow];
				$findRefTargetId = $this->handleFindRefTarget($sequenceFlow);

				$nextNode = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "node");
				$nextKey  = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "key");
				$nextType = $this->searchTargetRef($findRefTargetId, $exclusiveGateways, $parallelGateways, $taskNode, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent, "type");

				$sequenceFlow->targetRef = $nextKey;

				foreach ($sequenceFlow as $sequenceFlowKey => $sequenceFlowValue) {
					$sequenceFlow->targetRef = [$nextKey => $nextNode];
				}
				foreach ($nextNode as $nextNodeKey => $nextNodeValue) {
					if ($nextNodeKey === "hasOutgoing" && $nextNodeValue) {
						$this->buildTree($nextNode, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent);
					}
				}
			}
			$hasOutgoing = false;
		}
	}

	public
	function outGoingTo($startEvent, $taskNode, $sequenceFlows, $exclusiveGateways,
	                    $inclusiveGateways, $parallelGateways, $subProcess, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask,
	                    $endEvent)
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
			$test = $this->buildTree($baumValue, $startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $parallelGateways, $subProcess, $endEvent);
		}

		return $nodeList;
	}
}