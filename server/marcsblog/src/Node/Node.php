<?php

namespace MarcsBlog\Node;

class Node
{
	public $id;
	public $outgoing=null;
	public $incoming=null;

	public function __construct(string $id)
	{
		$this->id=$id;
	}


}
// forEach($node as $element => $elementNode)
