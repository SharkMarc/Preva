<?php

$users = [
	'admin' => ['pw' => 'asdfjlasd', 'isAdmin' => true],
	'marc'  => ['pw' => '3463464', 'isAdmin' => false],
];

header("Content-Type: application/json");
echo json_encode(["foo" => "bar"]);