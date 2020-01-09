<?php
header("Content-Type: application/json");
// ---- REFRESH DATABASE ---
include_once __DIR__."/../src/Service/TokenGenerator.php";
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
if (json_last_error()) {
    echo json_encode(['error' => 1, 'message' => json_last_error(), 'isAdmin' => false]);
    exit;
}
$realEmail = $email->email;
$emailPw   = $email->password;
$currentDateTime = date('d-m-Y H:i:s');
// / =directory seperator
// \ =namespace seperator
$token = new \Service\TokenGenerator(); //fully qualified classname
var_dump($token);
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
                    echo json_encode(['error' => 3, 'message' => '', 'username' => $realEmail, 'isAdmin' => $value["isAdmin"]]);
                    exit;
                }
                echo json_encode(['error' => 1, 'message' => 'pw oder name falsch du nase', 'isAdmin' => $value["isAdmin"]]);
                exit;
            } catch (Exception $e) {
                echo $e;
            }
        } else {
            next($users);
        }
    }
}
echo json_encode(['error' => 1, 'message' => 'pw oder name falsch du nase', 'isAdmin' => $value["isAdmin"]]);
exit;