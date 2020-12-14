<?php

namespace MarcsBlog\Node;

class ExclusiveGatewayNode
{
	public $id;

	public $type        = "exclusiveGateway";

	public $name        = null;

	public $incoming    = null;

	public $hasOutgoing = true;

	public $outgoing = [];

	public function __construct(string $id, $name, string $incoming, array $outgoing)
	{
		$this->id       = $id;
		$this->name     = $name;
		$this->incoming = $incoming;
		$this->outgoing = $outgoing;
	}

	public function getName($name){
		return $this->type;
	}
}