<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Load config
    $config = require __DIR__ . '/config.php';
    $smtp = $config['smtp'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = $smtp['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtp['username'];
    $mail->Password = $smtp['password'];
    $mail->SMTPSecure = $smtp['encryption'];
    $mail->Port = $smtp['port'];

    // Recipients
    $mail->setFrom('kiriswawinrose@gmail.com', 'Winrose Kiriswa');
    $mail->addAddress('kiriswawinrose@gmail.com');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email from Portfolio Contact Form';
    $mail->Body    = 'This is a test email to verify the SMTP configuration is working.';

    $mail->send();
    echo "Test email sent successfully!\n";
} catch (Exception $e) {
    echo "Error sending test email: {$mail->ErrorInfo}\n";
}
