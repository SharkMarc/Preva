<?php
namespace Preva\Metric;

use Preva\Element\Edge;
use Preva\Element\EndEvent;
use Preva\Element\ExclusiveGateway;
use Preva\Element\InclusiveGateway;
use Preva\Element\IsConnector;
use Preva\Element\IsDecision;
use Preva\Element\ParallelGateway;
use Preva\Element\Process;
use Preva\Element\SequenceFlow;
use Preva\Element\StartEvent;
use Preva\Element\Task;
use Preva\Path\Path;
use Preva\Path\PathBuilder;

class MetricsCalculator
{
	private Diagnostics $diagnostics;

	public function __construct()
	{
		$this->diagnostics = new Diagnostics();
	}

	public function getDiagnostics(): Diagnostics
	{
		return $this->diagnostics;
	}

	private function countNodes(Process $process): int
	{
		return count($process->getChildNodes());
	}

	private function countEdges(Process $process): int
	{
		return count($process->allEdges);
	}

	public function numberOfActivities(Process $process): int
	{
		$tasks = 0;

		foreach ($process->getChildNodes() as $child) {
			if ($child instanceof Task) {
				$tasks++;
			}
		}

		if (!$tasks) {
			throw new \InvalidArgumentException("Number of ativities", 404);
		}

		return $tasks;
	}

	public function sequenceFlow(Process $process): int
	{
		$sequenceFlows = 0;
		foreach ($process->getChildNodes() as $node) {
			if ($node->getOutgoingEdges()) {
				foreach ($node->getOutgoingEdges() as $sequence) {
					if ($sequence->targetRef === $sequence->sourceRef) {
//						source target same
						throw new \LogicException("Sequence Flow source/target are the same", 404);
					}
					$sequenceFlows++;
				}
			}
		}

		return $sequenceFlows;
	}

	public function numberOfActivitiesAndControlFlows(Process $process): int
	{
		if (!$this->countNodes($process)) {
			throw new \LogicException("Number of activities control-flow elements");
		}

		return $this->countNodes($process);
	}

	public function coefficientOfNetworkComplexity(Process $process): float
	{
		return $this->countEdges($process) / $this->numberOfActivitiesAndControlFlows($process);
	}

	public function density(Process $process): float
	{
		return $this->coefficientOfNetworkComplexity($process) / ($this->numberOfActivitiesAndControlFlows($process) - 1);
	}

	public function separability(Process $process): float
	{
		$loops          = [];
		$endEventList   = [];
		$endEventAmount = 0;
		$processList    = [];
		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof StartEvent) {
				$startEvent = $node->id;
			}
			if ($node instanceof EndEvent) {
				$endEvent = $node->id;
				$endEventAmount++;
				$endEventList[] = $node->id;
			}
			$processList[$node->id] = [];
			$outgoings              = 0;
			$incomings              = 0;

			foreach ($node->getOutgoingEdges() as $outgoing) {
				if ($outgoing->targetRef) {
					$processList[$node->id]["outgoing"][$outgoings] = [$outgoing->targetRef];
				}

				$outgoings++;
			}
			$processList[$node->id]["amountOutgoing"] = $outgoings;

			foreach ($node->getIncomingEdges() as $incoming) {
				if ($incoming->sourceRef) {
					$processList[$node->id]["incoming"][$incomings] = [$incoming->sourceRef];
				}

				$incomings++;
			}
			$processList[$node->id]["amountIncoming"] = $incomings;
		}

		function callMyselfUntilExclusive(string $currentNode, array &$processList, array &$getStartArray)
		{
			$amountOutgoing = $processList[$currentNode]["amountOutgoing"];
			if ($amountOutgoing === 1) {
				$nextNode        = $processList[$currentNode]["outgoing"][0][0];
				$getStartArray[] = $nextNode;
				callMyselfUntilExclusive($nextNode, $processList, $getStartArray);
			}
		}

		function callMyselfUntilExclusiveEnd(string $currentNode, array &$processList, array &$getEndArray)
		{
			$amountIncoming = $processList[$currentNode]["amountIncoming"];
			if ($amountIncoming === 1) {
				$nextNode = $processList[$currentNode]["incoming"][0][0];
				if ($processList[$nextNode]["amountOutgoing"] > 0) {
					if ($processList[$nextNode]["amountIncoming"] > 0) {
						$getEndArray[$nextNode]    = $nextNode;
						$getEndArray[$currentNode] = $nextNode;
					}
				}
				callMyselfUntilExclusiveEnd($nextNode, $processList, $getEndArray);
			}

			if ($amountIncoming > 1) {
				$getEndArray[$currentNode] = $currentNode;
			}
		}

		$getArrays      = [];
		$list           = [];
		$getArrayAmount = 0;
		function callMyself2(string $currentNode, array &$processList, array &$loops, array &$getArrays, array &$list, int &$getArrayAmount)
		{

            if (!isset($processList[$currentNode]['visited'])) {
                $processList[$currentNode]['visited'] = 0;
            }

            // ✅ Wenn Node schon mehrfach besucht wurde
            if ($processList[$currentNode]['visited'] > 0) {
                $loops[$currentNode]          = 1;
                $getArrays[$getArrayAmount][] = $currentNode;

                return [1, false];
            }


            $amountOutgoing = $processList[$currentNode]["amountOutgoing"];
			if (!$amountOutgoing) {
				$getArrays[$getArrayAmount][] = $currentNode;

				return [0, false];
			}

			$processList[$currentNode]["visited"]++;
			$loopLength      = 0;
			$incrementLength = 0;
			$stop            = false;
			for ($o = 0; $o < $amountOutgoing; $o++) {
				$nextNode = $processList[$currentNode]["outgoing"][$o][0];
				if ($amountOutgoing > 1) {
					$getArrayAmount++;
					$getArrays[$getArrayAmount][] = $currentNode;
				} else {
					$getArrays[$getArrayAmount][] = $currentNode;
				}
				[$newLength, $stopCounter] = callMyself2($nextNode, $processList, $loops, $getArrays, $list, $getArrayAmount);

				if ($loopLength < $newLength) {
					$stop            = $stopCounter;
					$incrementLength = $stopCounter ? 0 : 1;
					$loopLength      = $newLength;
				}
			}

			$processList[$currentNode]["visited"]--;
			if (!$loopLength) {

				return [0, false];
			}

			if (isset($loops[$currentNode])) {

				return [$loopLength + 1, true];
			}

			return [$loopLength + $incrementLength, $stop];
		}

		$longestLoop = 0;
		foreach ($processList[$startEvent]["outgoing"] as $startOut) {
			$nextNode = $startOut[0];
			callMyself2($nextNode, $processList, $loops, $getArrays, $list, $getArrayAmount);
		}

		$getStartArray = [];
		foreach ($processList[$startEvent]["outgoing"] as $startOut) {
			$nextNode        = $startOut[0];
			$getStartArray[] = $nextNode;
			callMyselfUntilExclusive($nextNode, $processList, $getStartArray);
		}

		$getEndArray = [];
		if ($processList[$endEvent]["amountIncoming"] < 2 && $endEventAmount < 2) {
			foreach ($processList[$endEvent]["incoming"] as $EndIn) {
				$nextNode      = $EndIn[0];
				$getEndArray[] = $nextNode;
				callMyselfUntilExclusiveEnd($nextNode, $processList, $getEndArray);
			}
		}

		$finalList = [];
		foreach ($getEndArray as $item => $value) {
			$finalList[$value] = $item;
		}

		foreach ($getStartArray as $item => $value) {
			$finalList[$value] = $item;
		}

		$testList = [];
		for ($l = 0; $l < count($getArrays); $l++) {
                if (!isset($getArrays[$l]) || !is_array($getArrays[$l])) {
                    continue;
                }
				for ($k = 0; $k < count($getArrays[$l]); $k++) {
                    $key = $getArrays[$l][$k];

                    if (!isset($testList[$key])) {
                        $testList[$key] = 0;
                    }

                    $testList[$key]++;
				}
		}

        $amount = 0;
		if (count($endEventList) > 1) {
			foreach ($endEventList as $item => $value) {
				$amount += $testList[$value];
			}
		} else {
			$amount = $testList[$endEvent];
		}

		// workaround for behind exlcusive
		foreach ($testList as $item => $value) {
			if ($value === $amount) {
				$finalList[$item] = $value;

				if ($processList[$item]["amountOutgoing"] > 1 && $processList[$item]["amountIncoming"] === 1) {
//					no start / end events
					if ($processList[$processList[$item]["incoming"][0][0]]["amountIncoming"] !== 0 &&
						$processList[$processList[$item]["incoming"][0][0]]["amountOutgoing"] !== 0) {
						if (count($endEventList) === 1) {
							callMyselfUntilExclusiveEnd($processList[$item]["incoming"][0][0], $processList, $finalList);
						}
					}
				}
			}
		}

		return count($finalList) - 1;
	}

	public function getSequenceFlows($ichbinalleFlows, $id)
	{
		foreach ($ichbinalleFlows as $sequenceFlow) {
			if ($sequenceFlow->id === $id) {
				return $sequenceFlow->targetRef;
			}
		}
	}

	public function sequentiality(Process $process): float
	{
		$betweenNonConnectors = 0;

		foreach ($process->allEdges as $edge) {
			if ((!$edge->source instanceof IsConnector) && (!$edge->target instanceof IsConnector)) {
				$betweenNonConnectors++;
			}
		}

		return $betweenNonConnectors / $this->countEdges($process);
	}

	public function diameter(Process $process): int
	{
		$runtimeStart = microtime(true);

		[$start,] = $this->findStartAndEndNodes($process);
		$this->buildPaths($process);

		// check path lengths
		$longest = null;
//		alle sequentflows
		$edgeCount = count($process->allEdges) + 1;
		foreach ($start->getOutgoingEdges() as $outgoingEdge) {
			foreach ($outgoingEdge->containingPaths as $path) {
				// traverse path
				$len         = 1;
				$p           = $path;
				$loopCounter = $edgeCount;
				while (true) {
					$this->diagnostics->diameterLoopCount++;
					--$loopCounter;
					if ($loopCounter < 0) {
						// this can no longer be a valid path - possible loop inside
						continue 2;
					}

					if ($p->isValidEnd()) {
						break;
					}

					if (!$p->isValid()) {
						throw new \LogicException('invalid path');
					}

					if ($p->loopDetectionVisit >= 2) {
						break;
					}
					if ($p->loopDetectionVisit > 1) {
						throw new \LogicException('Loop path komplett broken !');
						break;
						// this is a looping path, which will never end; do not consider for longest path
						// continue foreach (containingPaths)
//						 continue 2;
					}

					$len++;
					$p = $p->next;
				}

				if ($longest === null) {
					$longest = (object)['path' => $p, 'length' => $len];
				} elseif ($longest->length < $len) {
					$longest->path   = $p;
					$longest->length = $len;
				}
			}
		}

		if ($longest === null) {
			throw new \LogicException('what?');
		}

		$p = $longest->path;
		while (!$p->edge->source instanceof StartEvent) {
			$p = $p->prev;
		}
		while (!$p->edge->target instanceof EndEvent) {
			//var_dump($p->edge->source->getId());
			$p = $p->next;
		}

		$this->diagnostics->diameterRuntime = microtime(true) - $runtimeStart;

        return $longest->length + 1;
	}

	public function maxNestingDepth(Process $process): int
	{
		$decisions = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof IsDecision) {
				if (count($node->getOutgoingEdges()) > $decisions) {
					$decisions = count($node->getOutgoingEdges());
				}
			}
		}

		return $decisions;
	}

	public function avgDegreeOfConnectors(Process $process): float
	{
		$connector = 0;
		$outgoing  = 0;
		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof IsConnector) {
				$connector++;
				$outgoing += count($node->getOutgoingEdges());
			}
		}
		if (!$outgoing) {
			return 0;
		}

		return $outgoing / $connector;
	}

	public function maxDegreeOfConnectors(Process $process): int
	{
		$max = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof IsConnector) {
				$max = max($max, count($node->getOutgoingEdges()));
			}
		}

		return $max;
	}

	public function binaryDecisions(Process $process): int
	{
		$bin = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof IsDecision && count($node->getOutgoingEdges()) === 2) {
				$bin++;
			}
		}

		return $bin + 1;
	}

	public function controlFlowComplexity(Process $process): int
	{
		$hasAnd    = 0;
		$sumXorOut = 0;
		$orValue   = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof ParallelGateway) {
				$hasAnd = 1;
			} elseif ($node instanceof ExclusiveGateway) {
				$sumXorOut += count($node->getOutgoingEdges());
			} elseif ($node instanceof InclusiveGateway) {
				$orValue += 2 ** count($node->getOutgoingEdges());
			}
		}

		return $hasAnd + $sumXorOut + $orValue - 1;
	}

	public function concurrency(Process $process): int
	{
		$sum = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof ParallelGateway || $node instanceof InclusiveGateway) {
				$sum += count($node->getOutgoingEdges());
			}
		}

		return $sum - 1;
	}

	public function cyclicity(Process $process): float
	{
		$loops       = [];
		$processList = [];
		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof StartEvent) {
				$startEvent = $node->id;
			}
			$processList[$node->id] = [];
			$outgoings              = 0;

			foreach ($node->getOutgoingEdges() as $outgoing) {
				if ($outgoing->targetRef) {
					$processList[$node->id]["outgoing"][$outgoings] = [$outgoing->targetRef];
				}

				$outgoings++;
			}
			$processList[$node->id]["amountOutgoing"] = $outgoings;
		}

		function callMyself(string $currentNode, array &$processList, array &$loops): array
		{
            if (!isset($processList[$currentNode]['visited'])) {
                $processList[$currentNode]['visited'] = 0;
            }

			if ($processList[$currentNode]["visited"]) {
				$loops[$currentNode] = 1;

				return [1, false];
			}

            $amountOutgoing = $processList[$currentNode]["amountOutgoing"] ?? 0;
			if (!$amountOutgoing) {
				return [0, false];
			}

            if (!isset($processList[$currentNode]['visited'])) {
                $processList[$currentNode]['visited'] = 0;
            }

			$processList[$currentNode]["visited"]++;
			$loopLength      = 0;
			$incrementLength = 0;
			$stop            = false;
			for ($o = 0; $o < $amountOutgoing; $o++) {
				$nextNode = $processList[$currentNode]["outgoing"][$o][0];

				[$newLength, $stopCounter] = callMyself($nextNode, $processList, $loops);
				if ($loopLength < $newLength) {
					$stop            = $stopCounter;
					$incrementLength = $stopCounter ? 0 : 1;
					$loopLength      = $newLength;
				}
			}

			$processList[$currentNode]["visited"]--;
			if (!$loopLength) {
				return [0, false];
			}

			if (isset($loops[$currentNode])) {
				return [$loopLength + 1, true];
			}

			return [$loopLength + $incrementLength, $stop];
		}

		$longestLoop = 0;
		foreach ($processList[$startEvent]["outgoing"] as $startOut) {
			$nextNode = $startOut[0];
			[$newLength,] = callMyself($nextNode, $processList, $loops);

			$longestLoop = max($longestLoop, $newLength);
		}

		return $longestLoop - 1;
	}

	public function cyclomaticNumber(Process $process): int
	{
		/** @var StartEvent[] $starts */
		[, , $starts] = $this->findStartAndEndNodes($process);
		$this->buildPaths($process);

		$cyclomaticNumber = 0;

		$nodes         = $this->countNodes($process);
		$sequenceFlows = $this->countEdges($process);

		return $nodes - $sequenceFlows + 1;
	}

	public function cognitiveWeight(Process $process): int
	{
		$hasXor    = false;
		$hasBigXor = false;
		$hasAnd    = false;
		$hasOr     = false;
		$sum       = 0;

		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof ExclusiveGateway && (count($node->getOutgoingEdges()) < 2)) {
				throw new \LogicException("ExclusiveGateway");
			}

			if ($node instanceof ExclusiveGateway && count($node->getOutgoingEdges()) === 2 && !$hasXor) {
				$sum    += $node->cognitiveWeight;
				$hasXor = true;
			} elseif ($node instanceof ExclusiveGateway && count($node->getOutgoingEdges()) > 2 && !$hasBigXor) {
				$sum       += $node->bigCognitiveWeight;
				$hasBigXor = false;
			} elseif ($node instanceof ParallelGateway && (count($node->getOutgoingEdges()) < 2)) {
				throw new \LogicException("Parallel Gateway");
			} elseif ($node instanceof ParallelGateway && !$hasAnd) {
				$hasAnd = true;
				$sum    += $node->cognitiveWeight;
			} elseif ($node instanceof InclusiveGateway && !$hasOr) {
				$hasOr = true;
				$sum   += $node->cognitiveWeight;
			}
		}

		return $sum;
	}

	/**
	 * @return array{StartEvent, EndEvent[]}
	 */
	private function findStartAndEndNodes(Process $process): array
	{
		$starts       = [];
		$possibleEnds = [];
		foreach ($process->getChildNodes() as $node) {
			if ($node instanceof StartEvent) {
				$starts[] = $node;
			} elseif ($node instanceof EndEvent) {
				$possibleEnds[] = $node;
			}
		}

		if (empty($starts)) {
			throw new \LogicException('Start Event');
		}

		foreach ($starts as $start) {
			if (!$start->getOutgoingEdges()) {
				throw new \LogicException('Start Event');
			}
		}

		if (empty($possibleEnds)) {
			throw new \LogicException('End Event');
		}

		foreach ($possibleEnds as $end) {
			if (!$end->getIncomingEdges()) {
				throw new \LogicException('End Event');
			}
		}

		return [$starts[0], $possibleEnds, $starts];
	}

	private function buildPaths(Process $process): void
	{
		if (!empty($process->paths)) {
			// already done
			return;
		}

		$pathBuilder = new PathBuilder();
		$pathBuilder->build($process, $this->diagnostics);
		[$start,] = $this->findStartAndEndNodes($process);
		$pathBuilder->detectAndMarkLoops($process, $start);
	}
}
