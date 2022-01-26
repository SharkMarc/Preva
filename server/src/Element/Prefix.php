<?php

namespace Preva\Element;

class Prefix
{
	public bool $hasPrefix;

	public function __construct($hasPrefix=false)
	{
		$this->hasPrefix = $hasPrefix;
	}

	public function setPrefix($hasPrefix): void
	{
		$this->hasPrefix=$hasPrefix;
	}

	public function getPrefix(): bool
	{
		return $this->hasPrefix;
	}
}