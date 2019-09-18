<?php

header("Content-Type: application/json");

$firstname = htmlspecialchars($_POST['firstname']);
$surname   = htmlspecialchars($_POST['surname']);
$email     = htmlspecialchars($_POST['email']);
$text      = htmlspecialchars($_POST['text']);
$issue     = htmlspecialchars($_POST['issue']);

//  if ( isset( $_POST['submit'] ) )

$everything = '<h3>Email</h3>'.'<div>'.'Your name is '.$firstname.' '.'and surname is '.$surname.'</div>'.
	'<div>'.'Your issue is '.$issue.' '.'and ur mail is '.$email.'</div>'.
	'<div>'.'Your want me to tell that:'.$text.'</div>';
echo $everything;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$everything = trim(file_get_contents("php://input"));
	file_put_contents(__DIR__."/../contact.json", $everything);
} else {
	$everything = file_get_contents(__DIR__."/../contact.json");
}

echo $everything;
//mail('benutzer@example.com', $issue, $everything);
exit;