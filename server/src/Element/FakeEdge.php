<?php
namespace Preva\Element;

class FakeEdge extends Edge
{
    public static function withSource(string $id, Node $source): self
    {
        $self = new self(['id' => $id, 'sourceRef' => $source->id, 'targetRef' => '']);

        $self->source = $source;

        return $self;
    }

    public static function withTarget(string $id, Node $target): self
    {
        $self = new self(['id' => $id, 'sourceRef' => '', 'targetRef' => $target->id]);

        $self->target = $target;

        return $self;
    }
}