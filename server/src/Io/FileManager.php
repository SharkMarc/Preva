<?php
namespace Preva\Io;

use Preva\Element\Node;

class FileManager
{
    public function save(Node $node, string $filePath): void
    {
        file_put_contents($filePath, serialize($node));
    }

    public function load(string $filePath): Node
    {
        $contents = file_get_contents($filePath);

        return unserialize($contents);
    }
}