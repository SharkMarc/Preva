<?php

namespace Test;

class ElementCounterTest extends TestCase
{
	public function testCountElements(): void
	{
		$list     = [];
		$laodfile = simplexml_load_string(file_get_contents(__DIR__."/test.xml"), "SimpleXMLElement", 0, "bpmn2", true);

		$list  = (new \MarcsBlog\ElementCounter)->countElements($list, $laodfile);
		$array = [
			"process"                => 1,
			"task"                   => 1,
			"outgoing"               => 3,
			"extensionElements"      => 1,
			"sequenceFlow"           => 3,
			"exclusiveGateway"       => 1,
			"incoming"               => 4,
			"endEvent"               => 3,
			"messageEventDefinition" => 2,
			"errorEventDefinition"   => 2,
		];
		$this->assertEquals($array, $list);
	}

	public function testCountChildElements(): void
	{
		$laodfile = simplexml_load_string(file_get_contents(__DIR__."/test.xml"), "SimpleXMLElement", 0, "bpmn2", true);

		$list = (new \MarcsBlog\ElementCounter)->countChildElements($laodfile);

		$this->assertEquals([
			"process" => [
				"task"             => [
					'outgoing'          => 1,
					'extensionElements' => 1,
				],
				"sequenceFlow"     => 3,
				"exclusiveGateway" => [
					"incoming" => 1,
					"outgoing" => 2,
				],
				"endEvent"         => [
					0 => [
						"incoming"               => 1,
						"messageEventDefinition" => 1,
					],
					1 => [
						"incoming"             => 1,
						"errorEventDefinition" => 1,
					],
					2 => [
						"incoming"               => 1,
						"messageEventDefinition" => 1,
						"errorEventDefinition"   => 1,
					],
				],
			],
		], $list);
	}
}