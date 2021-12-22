<?php

namespace MarcsBlog\Service;

// polymorphismus
interface Programmierer
{
	public function hasEaten(): void;
}

interface Tester
{
	public function dueTest();
}

class Marc implements Programmierer
{
	public function hasEaten(): void
	{
		echo "ei";
	}
}

class Stefan implements Programmierer
{
	public function hasEaten(): void
	{
		echo "burger";
	}
}

class Arthur implements Programmierer, Tester
{

	public function hasEaten(): void
	{
		echo "unit teeeests";
	}

	public function dueTest()
	{
		echo "works";
	}
}


//
class ProgrammiererFactory
{
	public function get(string $coolness): Programmierer
	{
		if ($coolness === "over 9000") {
			return new Stefan();
		}
		if ($coolness === "unit Test") {
			return new Arthur();
		}

		return new Marc();
	}
}

$a = (new ProgrammiererFactory())->get("unit Tests");
if ($a instanceof Programmierer) {
	$a->hasEaten();
}
if ($a instanceof Tester) {
	$a->dueTest();
}
