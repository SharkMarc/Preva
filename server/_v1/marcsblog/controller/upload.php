<?php
//$start=microtime(true);
// check memoy usage!!
//echo memory_get_usage();
//echo memory_get_peak_usage();

header("Contdent-Type: application/json");
require dirname(__DIR__)."/vendor/autoload.php";

$taskConnection = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	//	postBody / filehandling
	$entityBody = file_get_contents('php://input');
	$entityBody = json_decode($entityBody, true);
	$content    = $entityBody['content'];
	$content    = explode(",", $content);
	$content    = base64_decode($content[1]);
//	$name       = dirname(__DIR__)."/".md5(uniqid()).".xml";
	$name       = dirname(__DIR__)."/".time().".xml";
	file_put_contents($name, $content);
	$strAll = substr($content, 0);

//if(isset($_FILES['userfile']['tmp_name'])){
//	var_dump("it exists");
//}

//$content = file_get_contents(__DIR__."/../noa.xml");
//$content = file_get_contents(__DIR__."/../11-07-21.xml");
//$content = file_get_contents(__DIR__."/../noa.xml");
//	$content = file_get_contents(__DIR__."/../dublicatedXor_v2.xml");
//	$content = file_get_contents(__DIR__."/../xorAnd.xml");

	$list       = [];
	$listBpmndi = [];
//	echo memory_get_usage();
//	echo "\n";
//	echo memory_get_peak_usage();
//	echo "\n";
//	echo "\n";


// get relevant data from bpmn model
	$laodfile = simplexml_load_string($content, "SimpleXMLElement", 0, "bpmn2", true);
	$bpmndi   = simplexml_load_string(file_get_contents($name), "SimpleXMLElement", 0, "bpmndi", true);

	$list        = (new \MarcsBlog\ElementCounter)->countElements($list, $laodfile);
	$bpmndiList  = (new \MarcsBlog\ElementCounter)->countElements($listBpmndi, $bpmndi);
	$list2       = (new \MarcsBlog\ElementCounter)->countChildElements($laodfile);
	$bpmndiList2 = (new \MarcsBlog\ElementCounter)->countChildElements($bpmndi);

//	$start=microtime(true);
//	echo round((microtime(true)-$start)*1000);
//	echo " ms: \n";
//	echo "\n";
//	echo memory_get_peak_usage();
//	var_dump("count elements");
//	var_dump($list);
//	var_dump("count child elements");
//	var_dump($list2);

//	$everything = [];
//	file_put_contents(__DIR__."/../uploadList.json", $everything);
	$bpmndiList = json_encode($bpmndiList);
	$list        = json_encode($list);
	$list2       = json_encode($list2);
	$bpmndiList2 = json_encode($bpmndiList2);

	file_put_contents(__DIR__."/../bpmndiList.json", $bpmndiList);
	file_put_contents(__DIR__."/../list.json", $list);
	file_put_contents(__DIR__."/../list2.json", $list2);
	file_put_contents(__DIR__."/../bpmndiList2.json", $bpmndiList2);

// --- HANDLE NODES ---
// get relevant BPMN objects isolated
	$startEvent = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->startEvent, "startEvent");

//var_dump("alle nodes");
	$noa = [
		'manualTask',
		'businessRuleTask',
		'callActivity',
		'manualTask',
		'receiveTask',
		'scriptTask',
		'sendTask',
		'serviceTask',
		'task',
		'subProcess',
		'userTask',
	];

//NOA Number of activites
	$taskNode         = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->task, "task");
	$businessRuleTask = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->businessRuleTask, "businessRuleTask");
	$subProcess       = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->subProcess, "subProcess");
	$callActivity     = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->callActivity, "callActivity");
	$manualTask       = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->manualTask, "manualTask");
	$receiveTask      = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->receiveTask, "receiveTask");
	$sendTask         = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->sendTask, "sendTask");
	$scriptTask       = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->scriptTask, "scriptTask");
	$serviceTask      = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->subProcess, "serviceTask");
	$userTask         = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->userTask, "userTask");

	$parallelGateways  = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->parallelGateway, "parallelGateway");
	$exclusiveGateways = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->exclusiveGateway, "exclusiveGateway");
	$inclusiveGateways = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->inclusiveGateway, "inclusiveGateway");
	$sequenceFlows     = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->sequenceFlow, "sequenceFlow");
	$endEvent          = (new \MarcsBlog\Service\NodeProvider)->getNodes($laodfile->process->endEvent, "endEvent");

//	var_dump($laodfile);
//	var_dump($startEvent);
//	var_dump($taskNode);
//	var_dump($subProcess);
//	var_dump($parallelGateway);
//	var_dump($exclusiveGateways);
//	var_dump($inclusiveGateways);
//	var_dump($sequenceFlows);
//	var_dump($endEvent);

	// --- Find Connections ---
	$taskConnection = (new  \MarcsBlog\Service\NodeConnections)->outGoingTo(
		$startEvent, $taskNode, $sequenceFlows, $exclusiveGateways, $inclusiveGateways, $parallelGateways, $subProcess, $businessRuleTask, $callActivity, $manualTask, $receiveTask, $sendTask, $scriptTask, $serviceTask, $userTask, $endEvent
	);

	$taskConnection = json_encode($taskConnection);
	file_put_contents(__DIR__."/../objectSummary.json", $taskConnection);
} else {
	$returnThisArray = [];
	$getContent      = file_get_contents(__DIR__."/../objectSummary.json");
	$bpmndiList      = file_get_contents(__DIR__."/../bpmndiList.json");
	$list            = file_get_contents(__DIR__."/../list.json");
//	$list2            = file_get_contents(__DIR__."/../list2.json");

	$getContent = json_decode($getContent);
	$bpmndiList = json_decode($bpmndiList);
	$list       = json_decode($list);

	$returnThisArray["objectSummary"] = $getContent;
	$returnThisArray["bpmndiList"]    = $bpmndiList;
	$returnThisArray["list"]          = $list;
	$returnThisArray["noa"]           = $list->businessRuleTask + $list->task + $list->callActivity + $list->manualTask + $list->receiveTask + $list->sendTask +
		$list->scriptTask + $list->serviceTask + $list->subProcess + $list->userTask + $list->callActivity;

	$returnThisArray = json_encode($returnThisArray);
	echo $returnThisArray;
}
