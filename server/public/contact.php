<?php
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__)."/vendor/autoload.php";

$dotenv = new Dotenv();
$dotenv->load(dirname(__DIR__).'/.env');

$transport = \Symfony\Component\Mailer\Transport::fromDsn($_ENV["MAILER_DSN"]);

$mailer = new \Symfony\Component\Mailer\Mailer(
	$transport
);

$email = new \Symfony\Component\Mime\Email();
$email->to("spree.marc@gmx.de");

$firstname   = htmlspecialchars($_POST['firstname']);
$surname     = htmlspecialchars($_POST['surname']);
$emailAdress = htmlspecialchars($_POST['email']);
$text        = htmlspecialchars($_POST['text']);
$issue       = htmlspecialchars($_POST['issue']);
$everything  = '<h3>PREVA Konaktformular</h3>'.'<p>'.'<b>Name: </b>'.$firstname.'</p> '.'<p><b>Surname:</b> '.$surname.'</p>'.
	'<p>'.'<b>The issue is:</b> '.$issue.'</p>'.'<p><b>E-mail:</b> '.$emailAdress.'</p>'.
	'<p>'.'<b>Message:</b> '.$text.'</p>';

$email->html($everything);
$email->subject($issue);
$email->from("spree.marc@gmx.de");
$email->text($everything);
$mailer->send($email);
