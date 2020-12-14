<?php

namespace MarcsBlog\Node;

class Node
{
	public $id;

	public $outgoing = null;

	public $incoming = null;

	public $name     = null;

	public function __construct(string $id)
	{
		$this->id = $id;
	}
}

