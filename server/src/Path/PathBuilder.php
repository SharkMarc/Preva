<?php
namespace Preva\Path;

use Preva\Element\Node;
use Preva\Element\Process;
use Preva\Element\StartEvent;
use Preva\Metric\Diagnostics;

class PathBuilder
{
	public function build(Process $process, ?Diagnostics $diagnostics = null): void
	{
		if ($diagnostics === null) {
			$diagnostics = new Diagnostics();
		}

		$start      = microtime(true);
		$pathCloner = new PathCloner();

		// create a path for each edge and clear existing paths
		foreach ($process->allEdges as $edge) {
			$edge->containingPaths = [];
			new Path($edge);
		}

		// visit every node
		foreach ($process->getChildNodes() as $node) {
			$clones = 0;
			// connect incoming paths to outgoing
			foreach ($node->getOutgoingEdges() as $outgoingEdge) {
				$outPathsCached = $outgoingEdge->containingPaths;
				foreach ($node->getIncomingEdges() as $inEdge) {
					foreach ($inEdge->containingPaths as $inPath) {
						foreach ($outPathsCached as $outPath) {
							$diagnostics->pathBuildingLoopCount++;
							if ($inPath->next === null) {
								$ip = $inPath;
							} else {
								$ip = $pathCloner->cloneWithPrev($inPath);
								$clones++;
							}

							if ($outPath->prev === null) {
								$op = $outPath;
							} else {
								$op = $pathCloner->cloneWithNext($outPath);
								$clones++;
							}

							$op->prev = $ip;
							$ip->next = $op;
						}
					}
				}
			}
		}

		$diagnostics->pathBuildingRuntime = microtime(true) - $start;
	}

	public function detectAndMarkLoops(Process $process, Node $start): void
	{
		foreach ($start->getOutgoingEdges() as $outgoingEdge) {
			foreach ($outgoingEdge->containingPaths as $path) {
				$p = $path;
				while ($p->next) {
					if ($p->loopDetectionVisit === 0) {
						// first encounter
						$p->loopDetectionVisit++;
					} elseif ($p->loopDetectionVisit === 1) {
						// second encounter, we are inside a loop now
						// go another round to find all nodes inside the loop
						$p->loopDetectionVisit++;
						// mark target node as inside
						$p->edge->target->insideLoop = true;
					} elseif ($p->loopDetectionVisit === 2) {
						// third encounter, all nodes inside the loop now have a counter of 2
						// we also counted all nodes inside the loop
						break;
					}
				}
			}
		}
	}
}
