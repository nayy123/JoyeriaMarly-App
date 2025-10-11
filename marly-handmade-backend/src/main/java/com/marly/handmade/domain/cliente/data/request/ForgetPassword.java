package com.marly.handmade.domain.cliente.data.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgetPassword(
        @Email(message = "El correo debe tener un formato")
        @NotBlank(message = "El email no puede ser blanco")
        String email
) {
}
