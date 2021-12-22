<?php
namespace Preva\Element;

use Preva\Path\Path;

class Process extends Node
{
    public ?bool $isExecutable;

    /**
     * @var Edge[]
     */
    public array $allEdges = [];

    /**
     * @var Path[]
     */
    public array $paths = [];

    public function getRequiredAttributes(): array
    {
        return ['id'];
    }
}
