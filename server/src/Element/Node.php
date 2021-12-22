<?php
namespace Preva\Element;

abstract class Node
{
    public string $id;

    public string $tagName;

    public bool $isClosed = false;

    public bool $insideLoop = false;

    /**
     * @var Node[]
     */
    protected array $childNodes = [];

    /**
     * @var Edge[]
     */
    protected array $incomingEdges = [];

    /**
     * @var Edge[]
     */
    protected array $outgoingEdges = [];

    public function getRequiredAttributes(): array
    {
        return [];
    }

    public function markAsClosed(): void
    {
        $this->isClosed = true;
    }

    public function addChildNode(Node $node): void
    {
        $this->childNodes[] = $node;
    }

    /**
     * @return Node[]
     */
    public function getChildNodes(): array
    {
        return $this->childNodes;
    }

    /**
     * @return Edge[]
     */
    public function getIncomingEdges(): array
    {
        return $this->incomingEdges;
    }

    public function setIncomingEdges(array $edges): void
    {
        $this->incomingEdges = $edges;
    }

    public function addIncomingEdge(Edge $edge): void
    {
        $this->incomingEdges[] = $edge;
    }

    /**
     * @return Edge[]
     */
    public function getOutgoingEdges(): array
    {
        return $this->outgoingEdges;
    }

    public function setOutgoingEdges(array $edges): void
    {
        $this->outgoingEdges = $edges;
    }

    public function addOutgoingEdge(Edge $edge): void
    {
        $this->outgoingEdges[] = $edge;
    }
}
