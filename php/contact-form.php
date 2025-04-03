<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Include PHPMailer if it exists
$phpmailer_path = __DIR__ . '/../vendor/autoload.php';
if (file_exists($phpmailer_path)) {
    require $phpmailer_path;
    $use_phpmailer = true;
} else {
    $use_phpmailer = false;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit;
}

// Get and sanitize form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validate inputs
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all fields'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email format'
    ]);
    exit;
}

// Save message to file (as a backup)
$log_dir = __DIR__ . '/../messages';
if (!file_exists($log_dir)) {
    mkdir($log_dir, 0777, true);
}

$log_file = $log_dir . '/contact_messages.txt';
$log_entry = sprintf(
    "Date: %s\nName: %s\nEmail: %s\nMessage: %s\n----------------------------------------\n",
    date('Y-m-d H:i:s'),
    $name,
    $email,
    $message
);

file_put_contents($log_file, $log_entry, FILE_APPEND);

// Function to send email using PHPMailer
function send_email_phpmailer($to, $subject, $message_body, $from_email, $from_name, $reply_to = '') {
    $mail = new PHPMailer(true);

    try {
        // Load SMTP configuration
        $config = require __DIR__ . '/config.php';
        $smtp = $config['smtp'];

        // Server settings
        $mail->isSMTP();
        $mail->Host = $smtp['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp['username'];
        $mail->Password = $smtp['password'];
        $mail->SMTPSecure = $smtp['encryption'];
        $mail->Port = $smtp['port'];
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom($from_email, $from_name);
        $mail->addAddress($to);
        if ($reply_to) {
            $mail->addReplyTo($reply_to);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message_body;
        $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $message_body));

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

// Prepare email content with HTML formatting
$winrose_subject = "📨 New Contact: Message from $name";
$winrose_message = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;'>";
$winrose_message .= "<h2 style='color: #2c3e50; margin-bottom: 20px;'>📬 New Portfolio Message</h2>";
$winrose_message .= "<div style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px;'>";
$winrose_message .= "<p><strong>👤 From:</strong> $name</p>";
$winrose_message .= "<p><strong>📧 Email:</strong> $email</p>";
$winrose_message .= "</div>";
$winrose_message .= "<div style='background-color: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px;'>";
$winrose_message .= "<h3 style='color: #2c3e50; margin-bottom: 10px;'>💭 Message:</h3>";
$winrose_message .= "<p style='white-space: pre-wrap;'>$message</p>";
$winrose_message .= "</div>";
$winrose_message .= "</div>";

$sender_subject = "✨ Thank You for Contacting Winrose Kiriswa";
$sender_message = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;'>";
$sender_message .= "<h2 style='color: #2c3e50; margin-bottom: 20px;'>Hello $name! 👋</h2>";
$sender_message .= "<p style='margin-bottom: 15px;'>Thank you for considering me as your Full stack Software engineer. 🙏 I've received your message and appreciate your interest.</p>";
$sender_message .= "<p style='margin-bottom: 15px;'>I'll review your message carefully and get back to you as soon as possible. 📝</p>";
$sender_message .= "<div style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;'>";
$sender_message .= "<h3 style='color: #2c3e50; margin-bottom: 10px;'>Your Message:</h3>";
$sender_message .= "<p style='white-space: pre-wrap;'>$message</p>";
$sender_message .= "</div>";
$sender_message .= "<div style='margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;'>";
$sender_message .= "<p style='margin: 0;'><strong>Best regards,</strong></p>";
$sender_message .= "<p style='margin: 5px 0;'>Winrose Kiriswa</p>";
$sender_message .= "<p style='color: #6c757d; margin: 5px 0;'>Full Stack Software Engineer</p>";
$sender_message .= "<p style='margin: 5px 0;'>📧 kiriswawinrose@gmail.com</p>";
$sender_message .= "<p style='margin: 5px 0;'>📱 +254 71540 8990</p>";
$sender_message .= "</div>";
$sender_message .= "</div>";

try {
    $success = true;
    $errors = [];

    if ($use_phpmailer) {
        // Send email to Winrose using PHPMailer
        if (!send_email_phpmailer(
            'kiriswawinrose@gmail.com',
            $winrose_subject,
            $winrose_message,
            $email,
            $name
        )) {
            $success = false;
            $errors[] = "Failed to send notification to Winrose";
        }

        // Send confirmation email to sender using PHPMailer
        if (!send_email_phpmailer(
            $email,
            $sender_subject,
            $sender_message,
            'kiriswawinrose@gmail.com',
            'Winrose Kiriswa',
            'kiriswawinrose@gmail.com'
        )) {
            $success = false;
            $errors[] = "Failed to send confirmation email";
        }
    } else {
        // Fallback to regular mail() function
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        if (!@mail('kiriswawinrose@gmail.com', $winrose_subject, $winrose_message, $headers)) {
            $success = false;
            $errors[] = "Failed to send notification to Winrose";
        }

        $sender_headers = "From: kiriswawinrose@gmail.com\r\n";
        $sender_headers .= "Reply-To: kiriswawinrose@gmail.com\r\n";
        $sender_headers .= "X-Mailer: PHP/" . phpversion();

        if (!@mail($email, $sender_subject, $sender_message, $sender_headers)) {
            $success = false;
            $errors[] = "Failed to send confirmation email";
        }
    }

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully. Please check your email for confirmation.'
        ]);
    } else {
        // If some emails failed but we saved the message
        echo json_encode([
            'success' => true,
            'message' => 'Message received. We will get back to you soon. ' . 
                        ($errors ? '(Note: ' . implode(', ', $errors) . ')' : '')
        ]);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'There was an error sending your message. Please try again later.'
    ]);
}
