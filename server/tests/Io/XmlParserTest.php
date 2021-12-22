<?php
namespace Preva\Test\Io;

use Preva\Element\Edge;
use Preva\Element\Process;
use Preva\Element\StartEvent;
use Preva\Test\TestCase;
use Preva\Io\XmlParser;

class XmlParserTest extends TestCase
{
    private XmlParser $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = new XmlParser();
    }

    public function testParseMissingFile(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/missing file .+/');

        $this->subject->parse(__DIR__.'/../../fixtures/does-not-exist.bpmn');
    }

    public function testParse(): void
    {
        $result = $this->subject->parse(__DIR__.'/../../fixtures/EasyTrue#1.bpmn');

        //var_dump($result);

        self::assertInstanceOf(Process::class, $result);

        $children = $result->getChildNodes();
        self::assertCount(10, $children);

        self::assertInstanceOf(StartEvent::class, $children[0]);
        self::assertEquals([], $children[0]->getIncomingEdges());
        self::assertCount(1, $children[0]->getOutgoingEdges());

        $edge = $children[0]->getOutgoingEdges()[0];
        self::assertInstanceOf(Edge::class, $edge);
        self::assertEquals('StartEvent_0cv0o9q', $edge->sourceRef);
        self::assertEquals('Activity_032v8kz', $edge->targetRef);
    }
}
