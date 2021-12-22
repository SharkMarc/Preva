<?php
namespace Preva\Path;

class PathCloner
{
    public function cloneWithPrev(Path $original): Path
    {
        $new = clone $original;

        $visitedNodes = [$original];
        $clones       = [$new];

        // walk up the chain and clone all predecessors
        $n = $new;
        while ($n->prev !== null) {
            if ($idx = array_search($n->prev, $visitedNodes, true)) {
                // loop detected
                $n->prev            = $clones[$idx];
                $clones[$idx]->next = $n;

                break;
            }

            $visitedNodes[] = $n->prev;
            $n->prev        = clone $n->prev;
            $clones[]       = $n->prev;

            $n->prev->next = $n;
            $n             = $n->prev;
        }

        // disconnect followers
        $new->next = null;

        return $new;
    }

    public function cloneWithNext(Path $original): Path
    {
        $new = clone $original;

        $visitedNodes = [$original];
        $clones       = [$new];

        // walk down the chain and clone all followers
        $n = $new;
        while ($n->next !== null) {
            if ($idx = array_search($n->next, $visitedNodes, true)) {
                // loop detected
                $n->next            = $clones[$idx];
                $clones[$idx]->prev = $n;

                break;
            }

            $visitedNodes[] = $n->next;
            $n->next        = clone $n->next;
            $clones[]       = $n->next;

            $n = $n->next;
        }

        // disconnect predecessor
        $new->prev = null;

        return $new;
    }
}