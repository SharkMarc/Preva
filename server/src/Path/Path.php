<?php
namespace Preva\Path;

use Preva\Element\Edge;
use Preva\Element\EndEvent;
use Preva\Element\StartEvent;

class Path
{
    public string $uuid;

    public Edge $edge;

    public ?Path $prev = null;

    public ?Path $next = null;

    /**
     * Will be set during loop-detection.
     * 0 -> no visit yet
     * 1 -> was visited before (may or may not be inside a loop)
     * 2 -> visited twice and therefore inside a loop
     */
    public int $loopDetectionVisit = 0;

    public function __construct(Edge $edge)
    {
        $this->edge = $edge;

        $edge->containingPaths[] = $this;

        $this->generateUuid();
    }

    public function __clone()
    {
        $this->edge->containingPaths[] = $this;

        $this->generateUuid();
    }

    private function generateUuid(): void
    {
        // only enable for debugging, this has performance implications
        $this->uuid = md5(uniqid('', true));
    }

    public function isValidStart(): bool
    {
        return $this->prev === null && $this->edge->source instanceof StartEvent;
    }

    public function isValidEnd(): bool
    {
        return $this->next === null && $this->edge->target instanceof EndEvent;
    }

    public function isValid(): bool
    {
        return $this->isValidStart()
            || $this->isValidEnd()
            || ($this->prev !== null && $this->next !== null);
    }
}