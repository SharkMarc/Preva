<?php

require dirname(__DIR__)."/vendor/autoload.php";

header("Content-Type: text/text");

//print_r($_FILES['userfile']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	$tmpName = $_FILES['userfile']['tmp_name'];
	$content = file_get_contents($tmpName);
	$name    = dirname(__DIR__)."/".time().".xml";
	file_put_contents($name, $content);
	$strAll = substr($content, 0);

	$list       = [];
	$listBpmndi = [];
	$laodfile   = simplexml_load_string(file_get_contents($name), "SimpleXMLElement", 0, "bpmn2", true);
	$bpmndi     = simplexml_load_string(file_get_contents($name), "SimpleXMLElement", 0, "bpmndi", true);

	$list        = (new \MarcsBlog\ElementCounter)->countElements($list, $laodfile);
	$bpmndiList  = (new \MarcsBlog\ElementCounter)->countElements($listBpmndi, $bpmndi);
	$list2       = (new \MarcsBlog\ElementCounter)->countChildElements($laodfile);
	$bpmndiList2 = (new \MarcsBlog\ElementCounter)->countChildElements($bpmndi);
	$everything  = [];
	file_put_contents(__DIR__."/../uploadList.json", $everything);
	$bpmndiList  = json_encode($bpmndiList);
	$list        = json_encode($list);
	$bpmndiList2 = json_encode($bpmndiList2);

	file_put_contents(__DIR__."/../bpmndiList.json", $bpmndiList);
	file_put_contents(__DIR__."/../list.json", $list);
	file_put_contents(__DIR__."/../bpmndiList2.json", $bpmndiList2);
} else {
	$bpmndiList = file_get_contents(__DIR__."/../bpmndiList.json");
	echo $bpmndiList;
}
//print_r($list);
//print_r($list2);
//print_r($bpmndiList);
//print_r($bpmndiList2);
