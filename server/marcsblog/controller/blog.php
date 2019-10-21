<?php

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$content = trim(file_get_contents("php://input"));

	//check user admin
	$users     = file_get_contents(__DIR__."/../user.json");
	$users     = json_decode($users, true);
	$checkUser = file_get_contents(__DIR__."/../blog.json");
	$checkUser = json_decode($checkUser);
	$checkUser = $checkUser->user;
	$users     = $users[$checkUser];

	if ($users['isAdmin']===true) {
		file_put_contents(__DIR__."/../blog.json", $content);
	}
} else {
	$content = file_get_contents(__DIR__."/../blog.json");
}
echo $content;