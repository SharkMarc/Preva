<?php
header("Content-Type: application/json");
header('"Access-Control-Allow-Origin": "*"');
header('"Access-Control-Allow-Headers": "*"');
$firstname  = htmlspecialchars($_POST['firstname']);
$surname    = htmlspecialchars($_POST['surname']);
$email      = htmlspecialchars($_POST['email']);
$text       = htmlspecialchars($_POST['text']);
$issue      = htmlspecialchars($_POST['issue']);
$everything = '<h3>PREVA Konaktformular</h3>'.'<p>'.'<b>Name: </b>'.$firstname.'</p> '.'<p>Surname:</b> '.$surname.'</p>'.
	'<p>'.'<b>The issue is:</b> '.$issue.'</p>'.'<p><b>E-mail:</b> '.$email.'</p>'.
	'<p>'.'<b>Message:</b> '.$text.'</p>';
//echo $everything;
//	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//		$everything = trim(file_get_contents("php://input"));
//		file_put_contents(__DIR__."/../contact.json", $everything);
//	} else {
//		$everything = file_get_contents(__DIR__."/../contact.json");
//	}

$headers = "PREVA contact"."\r\n";
mail('spree.marc@gmx.de', $issue, $everything, $headers);
//echo $everything;
exit;