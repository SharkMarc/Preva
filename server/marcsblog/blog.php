<?php
namespace controller;

header('Content-Type: application/json');

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
	//Receive the RAW post data.
	echo $contentType."i am in if";
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content, true);
	//If json_decode failed, the JSON is invalid.
	if (!is_array($decoded)) {
		return $decoded;
	} else {
		echo "error";
	}
}
//$a=$_GET["data"];
//$ergebnis = $_POST["data"];
//echo $ergebnis;
//echo file_put_contents("test.json",json_decode($ergebnis));
//echo $ergebnis;

class Blog
{

	public function safeState()
	{
		echo "hi";
		file_put_contents("test.txt", "hallo");

		return "hi";
	}

}