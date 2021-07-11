<?php

namespace MarcsBlog\Node;

class Task
{
	public $id;

	public $name        = null;

	public $type        = "task";

	public $spezialType = "";

	public $hasOutgoing = true;

	public $incoming    = null;

	public $outgoing    = null;

	public function __construct(string $id, $name)
	{
		$this->id   = $id;
		$this->name = $name;
	}
}