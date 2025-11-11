package com.marly.handmade.infrastructure.email;

public interface EmailSender {
    void sendCorreo(String correo, String token, String nombres) throws Exception;
}
