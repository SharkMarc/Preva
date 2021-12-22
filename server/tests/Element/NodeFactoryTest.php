<?php
namespace Preva\Test\Element;

use Preva\Element\NodeFactory;
use Preva\Element\Process;
use Preva\Test\TestCase;

class NodeFactoryTest extends TestCase
{
    public function testCreateNodeMissingRequiredAttribute(): void
    {
        $this->expectException(\DomainException::class);
        $this->expectExceptionMessageMatches('/missing attribute .+/');

        (new NodeFactory())->createNode('bpmn:process');
    }

    public function testCreateNode(): void
    {
        $result = (new NodeFactory())->createNode('bpmn:process', ['id' => 'a123', 'isExecutable' => false]);

        self::assertInstanceOf(Process::class, $result);
        self::assertEquals('bpmn:process', $result->tagName);
        self::assertEquals('a123', $result->id);
        self::assertFalse($result->isExecutable);
    }
}
