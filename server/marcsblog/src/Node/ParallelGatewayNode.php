<?php

namespace MarcsBlog\Node;

class ParallelGatewayNode
{
	public $id;

	public $type        = "parallelGateway";

	public $name        = null;

	public $incoming    = null;

	public $hasOutgoing = true;

	public $outgoing = [];

	public function __construct(string $id, $name, array $outgoing, array $incoming)
	{
		$this->id       = $id;
		$this->name     = $name;
		$this->incoming = $incoming;
		$this->outgoing = $outgoing;
	}

}