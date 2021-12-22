<?php
namespace Preva\Test\Path;

use Preva\Element\Edge;
use Preva\Path\Path;
use Preva\Path\PathCloner;
use Preva\Test\TestCase;

class PathClonerTest extends TestCase
{
    public function testCloneWithPrev(): void
    {
        /** @var Path[] $paths */
        $paths = [];
        for ($i = 0; $i <= 10; $i++) {
            $e       = new Edge(['id' => "e_$i"]);
            $paths[] = new Path($e);
        }

        $p1             = $paths[0];
        $p1->prev       = $paths[2];
        $p1->next       = $paths[10];
        $paths[2]->prev = $paths[3];
        $paths[3]->prev = $paths[4];
        $paths[4]->prev = $paths[2]; // loop

        $subject = new PathCloner();
        $result  = $subject->cloneWithPrev($p1);

        // clone the object itself
        self::assertNotSame($result, $p1);
        self::assertSame($result->edge, $p1->edge);
        // clone all predecessors
        self::assertNotSame($result->prev, $p1->prev);
        self::assertSame($result->prev->edge, $p1->prev->edge);
        self::assertNotSame($result->prev->prev, $p1->prev->prev);
        self::assertSame($result->prev->prev->edge, $p1->prev->prev->edge);
        // clean downstream
        self::assertNull($result->next);
    }

    public function testCloneWithNext(): void
    {
        /** @var Path[] $paths */
        $paths = [];
        for ($i = 0; $i <= 10; $i++) {
            $e       = new Edge(['id' => "e_$i"]);
            $paths[] = new Path($e);
        }

        $p1             = $paths[0];
        $p1->next       = $paths[2];
        $p1->prev       = $paths[10];
        $paths[2]->next = $paths[3];
        $paths[3]->next = $paths[4];
        $paths[4]->next = $paths[2]; // loop

        $subject = new PathCloner();
        $result  = $subject->cloneWithNext($p1);

        // clone the object itself
        self::assertNotSame($result, $p1);
        self::assertSame($result->edge, $p1->edge);
        // clone all predecessors
        self::assertNotSame($result->next, $p1->next);
        self::assertSame($result->next->edge, $p1->next->edge);
        self::assertNotSame($result->next->next, $p1->next->next);
        self::assertSame($result->next->next->edge, $p1->next->next->edge);
        // clean downstream
        self::assertNull($result->prev);
    }
}