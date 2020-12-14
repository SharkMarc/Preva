<?php

namespace MarcsBlog\Node;

class EndEventNode
{
	public $id;

	public $type        = "endEvent";

	public $name        = null;

	public $hasOutgoing = false;

	public $incoming = null;

	public function __construct(string $id, $name, $incoming)
	{
		$this->id       = $id;
		$this->name     = $name;
		$this->incoming = $incoming;
	}
}