<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Získání a ošetření dat z formuláře
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    
    // Kontrola, zda jsou data vyplněna správně
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Prosím, vyplňte formulář správně.";
        exit;
    }

    // Adresa příjemce
    $recipient = "xsejdak@gmail.com";

    // Předmět e-mailu
    $subject = "Nová zpráva od $name";

    // Sestavení obsahu e-mailu
    $email_content = "Jméno: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Zpráva:\n$message\n";

    // Hlavička e-mailu
    $email_headers = "From: $name <$email>";

    // Odeslání e-mailu
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Záznam do logu odeslané zprávy
        $logEntry = "[" . date("Y-m-d H:i:s") . "] Name: $name, Email: $email, Message: $message\n";
        file_put_contents('submissions.log', $logEntry, FILE_APPEND);
        
        http_response_code(200);
        echo "Děkujeme! Vaše zpráva byla odeslána.";
    } else {
        http_response_code(500);
        echo "Při odesílání zprávy došlo k chybě. Zkuste to prosím později.";
    }
} else {
    // Pokud není volán metodou POST
    http_response_code(403);
    echo "Došlo k chybě při odesílání zprávy.";
}
?>
