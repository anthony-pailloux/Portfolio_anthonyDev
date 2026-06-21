<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Configuration manquante. Copiez config.sample.php en config.php.',
    ]);
    exit;
}

$config = require $configPath;

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$honeypot = trim((string) ($_POST['_honey'] ?? ''));

if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Message envoyé.']);
    exit;
}

$errors = [];

if ($name === '') {
    $errors['name'] = 'Le nom est requis.';
}

if ($email === '') {
    $errors['email'] = "L'email est requis.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Veuillez entrer une adresse email valide.';
}

if ($subject === '') {
    $errors['subject'] = 'Le sujet est requis.';
}

if ($message === '') {
    $errors['message'] = 'Le message est requis.';
}

if ($errors !== []) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Veuillez corriger les champs indiqués.', 'errors' => $errors]);
    exit;
}

$recipient = trim((string) ($config['recipient'] ?? ''));
$fromEmail = trim((string) ($config['from_email'] ?? ''));
$fromName = trim((string) ($config['from_name'] ?? 'Portfolio'));
$subjectPrefix = trim((string) ($config['subject_prefix'] ?? '[Portfolio]'));

if ($recipient === '' || $fromEmail === '') {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Configuration email incomplète.']);
    exit;
}

$mailSubject = $subjectPrefix . ' ' . $subject;
$body = "Nouveau message depuis le portfolio\n\n"
    . "Nom : {$name}\n"
    . "Email : {$email}\n"
    . "Sujet : {$subject}\n\n"
    . "Message :\n{$message}\n";

$encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    "From: {$encodedFromName} <{$fromEmail}>",
    "Reply-To: {$name} <{$email}>",
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail($recipient, '=?UTF-8?B?' . base64_encode($mailSubject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "L'envoi a échoué. Contactez-moi directement par email.",
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Votre message a bien été envoyé. Je vous répondrai dès que possible.',
]);
