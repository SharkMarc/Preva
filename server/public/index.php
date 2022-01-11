<?php
header("Contdent-Type: application/json");
require dirname(__DIR__)."/vendor/autoload.php";

$taskConnection = [];
try {
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$entityBody = file_get_contents('php://input');
		$entityBody = json_decode($entityBody, true);
		$content    = $entityBody['content'];
		$content    = explode(",", $content);
		$content    = base64_decode($content[1]);
		$name       = dirname(__DIR__)."/".time().".xml";

		file_put_contents($name, $content);

		$newXMLparser = new \Preva\Io\XmlParser();
		$process      = $newXMLparser->parse($name);

		$filehandler = new \Preva\Io\FileManager();
		$filehandler->save($process, dirname(__DIR__)."/saves/"."test");
		echo json_encode("alles gut");
	} else {
		$filehandler       = new \Preva\Io\FileManager();
		$process           = $filehandler->load(dirname(__DIR__)."/saves/"."test");
		$metricsCalculator = new \Preva\Metric\MetricsCalculator();

		if ($process instanceof \Preva\Element\Process) {
			$noa = $metricsCalculator->numberOfActivities($process);
		}

		echo json_encode([
			"noa"           => $noa,
			"bpmndiList"    => [],
			"list"          => [],
			"objectSummary" => [],
		]);
	}
}catch (\Exception $catch){
	http_response_code(500);
	echo json_encode(['error' => $catch->getMessage()]);
}


