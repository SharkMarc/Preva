<?php
namespace Preva\Test\Io;

use Preva\Element\Edge;
use Preva\Io\FileManager;
use Preva\Element\Process;
use Preva\Element\StartEvent;
use Preva\Test\TestCase;
use Preva\Io\XmlParser;

class FileManagerTest extends TestCase
{
    public function testSave(): string
    {
        $tree = (new XmlParser())->parse(__DIR__.'/../../fixtures/EasyTrue#1.bpmn');

        $filePath = __DIR__.'/../../saves/test-save.dat';
        (new FileManager())->save($tree, $filePath);

        self::assertFileExists($filePath);

        return $filePath;
    }

    /**
     * @depends testSave
     */
    public function testLoad(string $filePath): void
    {
        $result = (new FileManager())->load($filePath);

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