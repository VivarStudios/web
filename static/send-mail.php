<?php
// Permitir peticiones desde tu frontend (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $nombre  = filter_var($data['name'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email   = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $mensaje = filter_var($data['message'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (!$nombre || !$email || !$mensaje) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Datos inválidos."]);
        exit;
    }

    // Tu dirección de correo donde recibirás los mensajes
    $to = "ma.fuentes@vivarstudios.com";
    $subject = "Nuevo mensaje de contacto de: $nombre";
    
    $body = "Nombre: $nombre\n";
    $body .= "Correo: $email\n\n";
    $body .= "Mensaje:\n$mensaje\n";

    $headers = "From: noreply@vivarstudios.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo."]);
    }
} else {
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>