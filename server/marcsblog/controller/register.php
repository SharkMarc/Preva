<?php

header("Content-Type: application/json");

$getContent = file_get_contents(__DIR__."/../user.json");
$newUser    = trim(file_get_contents("php://input"));
$newUser    = json_decode($newUser);
$getContent = json_decode($getContent, true);

foreach ($getContent as $key => $value) {
	if ($key === $newUser->email) {
		echo json_encode(['error' => 4, 'message' => 'Tschisch! Name schon vorhanden sorry :-(', 'isAdmin' => false]);
		exit;
	}
	if ($newUser->email === "") {
		echo json_encode(['error' => 6, 'message' => 'Tschisch! Name leer!', 'isAdmin' => false]);
		exit;
	}
	if ($newUser->password === "") {
		echo json_encode(['error' => 7, 'message' => 'Tschisch! Empty!', 'isAdmin' => false]);
		exit;
	}
	if ($key !== $newUser->email && $newUser->password!=="") {
		$currentDateTime = date('d-m-Y H:i:s');
		$newUser         = [$newUser->email => ['pw' => $newUser->password, 'isAdmin' => false, 'lastLogin' => $currentDateTime]];
		$getContent      = array_merge($getContent, $newUser);
		$getContent      = json_encode($getContent);
		file_put_contents(__DIR__."/../user.json", $getContent);
		echo json_encode(['error' => 5, 'message' => 'Success! Time to Login !', 'isAdmin' => false]);
		exit;
	}
}
exit;