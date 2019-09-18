<?php
header("Content-Type: application/json");

// ---- REFRESH DATABASE ---

//$users = [
//	'admin' => ['pw' => 'admin', 'isAdmin' => true],
//	'marc'  => ['pw' => '1234', 'isAdmin' => false],
//	'marc2' => ['pw' => '123', 'isAdmin' => false],
//];
//$userArray = json_encode($users, true);
//file_put_contents(__DIR__."/user.json", $userArray);
//exit;

$users = file_get_contents(__DIR__."/../user.json");
$users = json_decode($users, true);
$login = trim(file_get_contents("php://input"));
$email = json_decode($login);

$realEmail = $email->email;
$emailPw   = $email->password;

$currentDateTime = date('d-m-Y H:i:s');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	foreach ($users as $key => $value) {
		if ($key === $realEmail) {
			try {
				if ($value["pw"] === $emailPw) {
					//set currentlogin
					if ($value["lastLogin"] !== $currentDateTime) {
						$users[$key]["lastLogin"] = $currentDateTime;
						$users                    = json_encode($users, true);
						file_put_contents(__DIR__."/../user.json", $users);
					}
					echo json_encode(['error' => 3, 'message' => '', 'isAdmin' => $value["isAdmin"]]);
					exit;
				}
				if ($value["pw"] === $emailPw) {
					//set currentlogin
					if ($value["lastLogin"] !== $currentDateTime) {
						$users[$key]["lastLogin"] = $currentDateTime;
						$users                    = json_encode($users, true);
						file_put_contents(__DIR__."/../user.json", $users);
					}
					echo json_encode(['error' => 3, 'message' => '', 'isAdmin' => $value["isAdmin"]]);
					exit;
				}
				echo json_encode(['error' => 1, 'message' => 'pw falsch du nase', 'isAdmin' => $value["isAdmin"]]);
				exit;
			} catch (Exception $e) {
				echo $e;
			}
		} else {
			next($users);
		}
	}
}
echo json_encode(['error' => 2, 'message' => 'email falsch du dummdoedel', 'isAdmin' => $value["isAdmin"]]);
exit;
