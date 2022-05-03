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
		$this->buildPaths($process);

		/** @var StartEvent $start */
		[$start, $possibleEnds] = $this->findStartAndEndNodes($process);

		$startPaths = 0;
		foreach ($start->getOutgoingEdges() as $outgoingEdge) {
			$startPaths += count($outgoingEdge->containingPaths);
		}

		if ($startPaths === 1) {
			// everything cuts if there is only one path
			return 1;
		}

		$countPaths = function (array $edges) {
			$p = 0;
			foreach ($edges as $e) {
				$p += count($e->containingPaths);
			}

			return $p;
		};

		$cut = 0;
		foreach ($process->getChildNodes() as $childNode) {
			if ($childNode instanceof StartEvent || $childNode instanceof EndEvent) {
				continue;
			}

			// remove child
			// check if incoming still connect to start
			// check if outgoing still connect to end

			$countTotalPathsToEnd = $countPaths($childNode->getOutgoingEdges());
			foreach ($childNode->getOutgoingEdges() as $outgoingEdge) {
				$pathsToEnd         = $outgoingEdge->containingPaths;
				$incomingPathsAtEnd = 0;
				$visitedEnds        = [];

				// advance path to end
				foreach ($pathsToEnd as $path) {
					$p = $path;
					while (!$p->isValidEnd() && $p->loopDetectionVisit < 2) {
						$p = $p->next;
					}
					if (!isset($visitedEnds[$p->edge->targetRef])) {
						$incomingPathsAtEnd               += $countPaths($p->edge->target->getIncomingEdges());
						$visitedEnds[$p->edge->targetRef] = true;
					}
				}
				if ($incomingPathsAtEnd <= $countTotalPathsToEnd) {
					$cut++;
					continue 2;
				}
			}

			$countTotalPathsToStart = $countPaths($childNode->getIncomingEdges());
			foreach ($childNode->getIncomingEdges() as $incomingEdge) {
				$pathsToStart        = $incomingEdge->containingPaths;
				$outgoingPathAtStart = 0;
				$visitedStarts       = [];

				// advance path to start
				foreach ($pathsToStart as $path) {
					$p = $path;
					while (!$p->isValidStart() && $p->loopDetectionVisit < 2) {
						$p = $p->prev;
					}
					if (!isset($visitedStarts[$p->edge->sourceRef])) {
						$outgoingPathAtStart                += $countPaths($p->edge->source->getOutgoingEdges());
						$visitedStarts[$p->edge->sourceRef] = true;
					}
				}
				if ($outgoingPathAtStart <= $countTotalPathsToStart) {
					$cut++;
					continue 2;
				}
			}
		}

		$nodesWithoutEnds = $this->numberOfActivitiesAndControlFlows($process) - (1 + count($possibleEnds));

//		print_r([$cut, $nodesWithoutEnds]);

		return $cut / $nodesWithoutEnds;
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

		return $longest->path + 1;
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
			if ($processList[$currentNode]["visited"]) {
				$loops[$currentNode] = 1;

				return [1, false];
			}

			$amountOutgoing = $processList[$currentNode]["amountOutgoing"];
			if (!$amountOutgoing) {
				return [0, false];
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

		$paths = 0;
		foreach ($starts as $start) {
			foreach ($start->getOutgoingEdges() as $outgoingEdge) {
				$paths += count($outgoingEdge->containingPaths);
			}
		}

		return $paths;
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
