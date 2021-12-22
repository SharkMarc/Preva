<?php
namespace Preva\Element;

class NodeFactory
{
    private const TAG_TO_CLASS = [
        'bpmn:process'          => Process::class,
        'bpmn:startEvent'       => StartEvent::class,
        'bpmn:endEvent'         => EndEvent::class,
        'bpmn:task'             => Task::class,
        'bpmn:exclusiveGateway' => ExclusiveGateway::class,
        'bpmn:parallelGateway'  => ParallelGateway::class,
        'bpmn:inclusiveGateway'  => InclusiveGateway::class,
    ];

    public function createNode(string $tagName, array $attributes = []): Node
    {
        if (!isset(self::TAG_TO_CLASS[$tagName])) {
            throw new \UnexpectedValueException(sprintf('Could not determine node class for %s', $tagName));
        }

        $className = self::TAG_TO_CLASS[$tagName];

        $node = new $className();
        if (!$node instanceof Node) {
            throw new \RuntimeException(sprintf('%s must extend %s', $className, Node::class));
        }

        $node->tagName = $tagName;

        foreach ($node->getRequiredAttributes() as $attr) {
            if (!isset($attributes[$attr])) {
                throw new \DomainException(sprintf('missing attribute %s', $attr));
            }
        }

        foreach ($attributes as $name => $value) {
            if (property_exists($node, $name)) {
                $node->$name = $value;
            }
        }

        return $node;
    }

    public function supports(string $tagName): bool
    {
        return isset(self::TAG_TO_CLASS[$tagName]);
    }
}
