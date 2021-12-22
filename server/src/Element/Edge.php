<?php
namespace Preva\Element;

use Preva\Path\Path;

class Edge
{
    public string $id;

    public string $sourceRef;

    public string $targetRef;

    public Node $source;

    public Node $target;

    /**
     * @var Path[]
     */
    public array $containingPaths = [];

    public function __construct(array $attributes)
    {
        $this->id        = $attributes['id'] ?? '';
        $this->sourceRef = $attributes['sourceRef'] ?? '';
        $this->targetRef = $attributes['targetRef'] ?? '';
    }
}
