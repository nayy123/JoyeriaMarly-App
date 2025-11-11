package com.marly.handmade.domain.usuario.data.request;

import com.marly.handmade.domain.cliente.data.request.ClienteDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;


public record RegistrarUsuario(
        @NotBlank(message = "username no puede ser blanco")
        String username,
        @NotBlank(message = "password no puede ser blanco")
        String password,
        @Valid
        ClienteDto cliente
) {
}
