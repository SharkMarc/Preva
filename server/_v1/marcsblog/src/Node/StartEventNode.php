<?php

namespace MarcsBlog\Node;

class StartEventNode
{
	public $id;

	public $type        = "startEvent";

	public $name        = null;

	public $hasOutgoing = true;

	public $outgoing    = null;

	public function __construct(string $id, string $outgoing)
	{
		$this->id       = $id;
		$this->outgoing = $outgoing;
	}

	public function getOutgoing()
	{
		return $this->outgoing;
	}

	public function setOutgoing($outgoing)
	{
		$this->outgoing = $outgoing;
	}

	public function getId()
	{
		return $this->id;
	}

	public function setId($id)
	{
		$this->id = $id;
	}
}