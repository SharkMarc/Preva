<?php

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$content = trim(file_get_contents("php://input"));
	file_put_contents(__DIR__."/../blog.json", $content);
} else {
	$content = file_get_contents(__DIR__."/../blog.json");
}
echo $content;