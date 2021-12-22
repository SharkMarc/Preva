<?php

namespace MarcsBlog\Node;

class SequenceFlowNode
{
	public $id;

	public $name      = null;

	public $sourceRef = null;

	public $hasOutgoing=true;

	public $type = "sequenceFlow";

	public $targetRef = null;

	public function __construct(string $id, $name, string $sourceRef, string $targetRef)
	{
		$this->id        = $id;
		$this->name      = $name;
		$this->sourceRef = $sourceRef;
		$this->targetRef = $targetRef;
	}


}
