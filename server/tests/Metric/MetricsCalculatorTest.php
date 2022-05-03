<?php
namespace Preva\Test\Metric;

use Preva\Element\Process;
use Preva\Metric\MetricsCalculator;
use Preva\Io\XmlParser;
use Preva\Test\TestCase;

class MetricsCalculatorTest extends TestCase
{
	private MetricsCalculator $subject;

	protected function setUp(): void
	{
		parent::setUp();

		$this->subject = new MetricsCalculator();
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testNoa(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['noa'], $this->subject->numberOfActivities($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testNoac(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['noac'], $this->subject->numberOfActivitiesAndControlFlows($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testCnc(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['cnc'], $this->subject->coefficientOfNetworkComplexity($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testDensity(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['density'], $this->subject->density($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testSeparability(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['separability'], $this->subject->separability($process));
	}

	public function testSeparability1(): void
	{
		$sep1 = (new XmlParser())->parse(__DIR__.'/../../fixtures/ObenSeparability.bpmn');
		self::assertEquals(1 / (9 - 2), $this->subject->separability($sep1));

		$sep2 = (new XmlParser())->parse(__DIR__.'/../../fixtures/UntenSeparability.bpmn');
		self::assertEquals(3 / (7 - 2), $this->subject->separability($sep2));

		$sep3 = (new XmlParser())->parse(__DIR__.'/../../fixtures/SepOhneLoopZweiAus.bpmn');
		self::assertEquals(3 / 7, $this->subject->separability($sep3));

		$this->markTestIncomplete();
		$sep4 = (new XmlParser())->parse(__DIR__.'/../../fixtures/SepMitLoopZweiAus.bpmn');
		self::assertEquals(2 / 8, $this->subject->separability($sep4));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testSequentiality(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['sequentiality'], $this->subject->sequentiality($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testDiameter(Process $process, array $expectedValues): void
	{
		$result = $this->subject->diameter($process);
		//print_r($this->subject->getDiagnostics());
		self::assertEquals($expectedValues['diameter'], $result);
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testMaxNestingDepth(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['maxNestingDepth'], $this->subject->maxNestingDepth($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testAvgDegreeOfConnectors(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['avgDegreeOfConnectors'], $this->subject->avgDegreeOfConnectors($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testMaxDegreeOfConnectors(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['maxDegreeOfConnectors'], $this->subject->maxDegreeOfConnectors($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testBinaryDecisions(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['binaryDecisions'], $this->subject->binaryDecisions($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testControlFlowComplexity(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['controlFlowComplexity'], $this->subject->controlFlowComplexity($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testConcurrency(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['concurrency'], $this->subject->concurrency($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testCyclicity(Process $process, array $expectedValues): void
	{
//		$this->markTestIncomplete();
		self::assertEquals($expectedValues['cyclicity'], $this->subject->cyclicity($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testCyclomaticNumber(Process $process, array $expectedValues): void
	{
		$this->markTestIncomplete();

		self::assertEquals($expectedValues['cyclomaticNumber'], $this->subject->cyclomaticNumber($process));
	}

	/**
	 * @dataProvider modelProvider
	 */
	public function testCognitiveWeight(Process $process, array $expectedValues): void
	{
		self::assertEquals($expectedValues['cognitiveWeight'], $this->subject->cognitiveWeight($process));
	}

	public function modelProvider(): iterable
	{
		$easyProcess        = (new XmlParser())->parse(__DIR__.'/../../fixtures/EasyTrue#1.bpmn');
		$easyExpectedValues = [
			'noa'                   => 5,
			'noac'                  => 10,
			'cnc'                   => 10 / 10,
			'density'               => 10 / 10 / 9,
			'separability'          => 5 / 7,
			'sequentiality'         => 5 / 10,
			'diameter'              => 7,
			'maxNestingDepth'       => 2,
			'avgDegreeOfConnectors' => 2,
			'maxDegreeOfConnectors' => 2,
			'binaryDecisions'       => 2,
			'controlFlowComplexity' => 2,
			'concurrency'           => 1,
			'cyclicity'             => 0 / 7,
			'cyclomaticNumber'      => 3,
			'cognitiveWeight'       => 6,
		];

		yield 'easy' => [$easyProcess, $easyExpectedValues];

		$mediumProcess        = (new XmlParser())->parse(__DIR__.'/../../fixtures/MediumTrue#1.bpmn');
		$mediumExpectedValues = [
			'noa'                   => 6,
			'noac'                  => 12,
			'cnc'                   => 12 / 12,
			'density'               => 12 / 12 / 11,
			'separability'          => 6 / 8,
			'sequentiality'         => 7 / 12,
			'diameter'              => 14,
			'maxNestingDepth'       => 2,
			'avgDegreeOfConnectors' => 2,
			'maxDegreeOfConnectors' => 2,
			'binaryDecisions'       => 3,
			'controlFlowComplexity' => 3,
			'concurrency'           => -1,
			'cyclicity'             => 4 / 12,
			'cyclomaticNumber'      => 10,
			'cognitiveWeight'       => 2,
		];

		yield 'medium' => [$mediumProcess, $mediumExpectedValues];

		$hardProcess        = (new XmlParser())->parse(__DIR__.'/../../fixtures/HardTrue#1.bpmn');
		$hardExpectedValues = [
			'noa'                   => 6,
			'noac'                  => 13,
			'cnc'                   => 18 / 13,
			'density'               => 18 / 13 / 12,
			'separability'          => 3 / 11,
			'sequentiality'         => 3 / 18,
			'diameter'              => 9,
			'maxNestingDepth'       => 3,
			'avgDegreeOfConnectors' => 11/5,
			'maxDegreeOfConnectors' => 3,
			'binaryDecisions'       => 4,
			'controlFlowComplexity' => 9,
			'concurrency'           => 1,
			'cyclicity'             => 10 / 13,
			'cyclomaticNumber'      => 5,
			'cognitiveWeight'       => 9,
		];

		yield 'hard' => [$hardProcess, $hardExpectedValues];

		$cncProcess        = (new XmlParser())->parse(__DIR__.'/../../fixtures/CNC.bpmn');
		$cncExpectedValues = [
			'noa'                   => 5,
			'noac'                  => 10,
			'cnc'                   => 12 / 10,
			'density'               => 12 / 10 / (10-1),
			'separability'          => 3 / 11,
			'sequentiality'         => 3 / 12,
			'diameter'              => 8,
			'maxNestingDepth'       => 2,
			'avgDegreeOfConnectors' => 6/3,
			'maxDegreeOfConnectors' => 2,
			'binaryDecisions'       => 2+1,
			'controlFlowComplexity' => (1+2+2**2)-1,
			'concurrency'           => 3,
			'cyclicity'             => 10 / 13,
			'cyclomaticNumber'      => 5,
			'cognitiveWeight'       => 13,
		];
		yield 'cnc' => [$cncProcess, $cncExpectedValues];

		$definitionName       = (new XmlParser())->parse(__DIR__.'/../../fixtures/lasttest.bpmn');
		$definitionNameExpectedValues = [
			'noa'                   => 2,
			'noac'                  => 4,
			'cnc'                   => 3/4,
			'density'               => 12 / 10 / (10-1),
			'separability'          => 3 / 11,
			'sequentiality'         => 3 / 12,
			'diameter'              => 8,
			'maxNestingDepth'       => 0,
			'avgDegreeOfConnectors' => 0,
			'maxDegreeOfConnectors' => 0,
			'binaryDecisions'       => 0+1,
			'controlFlowComplexity' => 0-1,
			'concurrency'           => -1,
			'cyclicity'             => 10 / 13,
			'cyclomaticNumber'      => 1,
			'cognitiveWeight'       => 0,
		];
//		yield 'definitionName' => [$definitionName, $definitionNameExpectedValues];


		$loopThreeProcess        = (new XmlParser())->parse(__DIR__.'/../../fixtures/loopThree.bpmn');
		$loopThreeExpectedValues = [
			'noa'                   => 5,
			'noac'                  => 8,
			'cnc'                   => 1,
			'density'               => 12 / 12 / 11,
			'separability'          => 6 / 8,
			'sequentiality'         => 7 / 12,
			'diameter'              => 8,
			'maxNestingDepth'       => 1,
			'avgDegreeOfConnectors' => 2,
			'maxDegreeOfConnectors' => 2,
			'binaryDecisions'       => 2,
			'controlFlowComplexity' => 3,
			'concurrency'           => -1,
			'cyclicity'             => 4 / 12,
			'cyclomaticNumber'      => 3,
			'cognitiveWeight'       => 2,
		];

		yield 'loopThreeProcess' => [$loopThreeProcess, $loopThreeExpectedValues];
	}
}
