package com.marly.handmade.infrastructure.email;

import com.maileroo.EmailAddress;
import com.maileroo.MailerooClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Component
public class EmailApiConsumer implements EmailSender {

    @Value("${key.send.correo}")
    private String keySend;

    public void sendCorreo (String correo, String token, String nombres) throws Exception {
        String resetUrl = "http://localhost:5173/confirm-new-password/" + token;
        String html = cargarHtml(nombres, resetUrl);
        try {
            MailerooClient client = new MailerooClient(keySend, Duration.ofSeconds(30));

            Map<String,Object> email = new HashMap<>();
            email.put("from", new EmailAddress("marlyhandmade@72fb112e6b2acd80.maileroo.org", "Marly Handmade"));
            email.put("to", new EmailAddress(correo, nombres));
            email.put("subject", "Hello from Marly Handmade!");
            email.put("html", html);
            email.put("plain", "Visita el siguiente enlace para restablecer tu contraseña: " + resetUrl);

            client.sendBasicEmail(email);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String cargarHtml(String name, String link) throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/templates/password-reset.html");
        String html = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        html = html.replace("{{name}}", name);
        html = html.replace("{{link}}", link);
        return html;
    }
}
