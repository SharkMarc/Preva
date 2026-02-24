<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $entityBody = file_get_contents('php://input');
    $data = json_decode($entityBody, true);

    $firstname = $data['contact']['firstname'] ?? '';
    $surname   = $data['contact']['surname'] ?? '';
    $email     = $data['contact']['email'] ?? '';
    $issue     = $data['contact']['issue'] ?? '';
    $text      = $data['contact']['text'] ?? '';

    $mail = new PHPMailer(true);

    try {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
        $dotenv->load();
        // 🔥 SMTP CONFIG (STRATO)
        $mail->isSMTP();
        $mail->Host       = 'smtp.strato.de';

        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@processevaluation.de';
        $mail->Password   =  $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // 🔥 Absender
        $mail->setFrom('info@processevaluation.de', 'Processevaluation');
        $mail->addAddress('info@processevaluation.de');

        $mail->Subject = "Neue Kontaktanfrage: " . $issue;

        $mail->Body = "
Neue Anfrage:

Name: $firstname $surname
Email: $email
Betreff: $issue

Nachricht:
$text
";

        $mail->isHTML(false);
        $mail->send();

        header('Content-Type: application/json');
        echo json_encode([
            "success" => true
        ], JSON_THROW_ON_ERROR);

    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "error" => $mail->ErrorInfo
        ]);
    }

    exit;
}