<?php
//ini_set("display_errors", 0);
header("Content-Type: application/json");
header('"Access-Control-Allow-Origin": "*"');
header('"Access-Control-Allow-Headers": "*"');
require dirname(__DIR__)."/vendor/autoload.php";
$taskConnection = [];

try {
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$entityBody = file_get_contents('php://input');
		$entityBody = json_decode($entityBody, true);
		$content    = $entityBody['content'];
		$content    = explode(",", $content);
		$content    = base64_decode($content[1]);
//		$name       = dirname(__DIR__)."/".time().".xml";
		$name = dirname(__DIR__)."/test.xml";
		file_put_contents($name, $content);

		$newXMLparser = new \Preva\Io\XmlParser();
		$process      = $newXMLparser->parse($name);

		$filehandler = new \Preva\Io\FileManager();
		$filehandler->save($process, dirname(__DIR__)."/saves/"."test");
//		echo json_encode("alles gut");
	} else {
		$filehandler       = new \Preva\Io\FileManager();
		$process           = $filehandler->load(dirname(__DIR__)."/saves/"."test");
		$metricsCalculator = new \Preva\Metric\MetricsCalculator();

		if ($process instanceof \Preva\Element\Process) {
			$noa                   = $metricsCalculator->numberOfActivities($process);
			$noac                  = $metricsCalculator->numberOfActivitiesAndControlFlows($process);
			$density               = $metricsCalculator->density($process);
			$separability          = $metricsCalculator->separability($process);
			$diameter              = $metricsCalculator->diameter($process);
			$sequentiality         = $metricsCalculator->sequentiality($process);
			$maxNestingDepth       = $metricsCalculator->maxNestingDepth($process);
			$avgDegreeOfConnectors = $metricsCalculator->avgDegreeOfConnectors($process);
			$maxDegreeOfConnectors = $metricsCalculator->maxDegreeOfConnectors($process);
			$binaryDecisions       = $metricsCalculator->binaryDecisions($process);
			$controlFlowComplexity = $metricsCalculator->controlFlowComplexity($process);
			$concurrency           = $metricsCalculator->concurrency($process);
			$cyclicity             = $metricsCalculator->cyclicity($process);
			$cyclomaticNumber      = $metricsCalculator->cyclomaticNumber($process);
			$cognitiveWeight       = $metricsCalculator->cognitiveWeight($process);
			$sequenceFlow          = $metricsCalculator->sequenceFlow($process);
		}
		echo json_encode([
			"noa"                   => $noa,
			"noac"                  => $noac,
			"density"               => $density,
			"separability"          => $separability,
			"sequentiality"         => $sequentiality,
			"diameter"              => $diameter,
			"maxNestingDepth"       => $maxNestingDepth,
			"avgDegreeOfConnectors" => $avgDegreeOfConnectors,
			"maxDegreeOfConnectors" => $maxDegreeOfConnectors,
			"binaryDecisions"       => $binaryDecisions,
			"controlFlowComplexity" => $controlFlowComplexity,
			"concurrency"           => $concurrency,
			"cyclicity"             => $cyclicity,
			"cyclomaticNumber"      => $cyclomaticNumber,
			"cognitiveWeight"       => $cognitiveWeight,
			"sequenceFlow"          => $sequenceFlow,
			"bpmndiList"            => [],
			"list"                  => [],
			"objectSummary"         => [],
		], JSON_THROW_ON_ERROR);
	}
} catch (\Exception $catch) {
	http_response_code(500);
	echo json_encode(['error' => $catch->getMessage()]);
}


