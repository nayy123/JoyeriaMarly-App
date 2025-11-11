package com.marly.handmade.domain.cliente.data.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ClienteDto(
        @NotBlank(message = "nombres no puede ser blanco")
        String nombres,
        @NotBlank(message = "apellidos no puede ser blanco")
        String apellidos,
        @NotBlank(message = "direccion no puede ser blanco")
        String direccion,
        @NotNull(message = "fechaNacimiento no puede ser nulo")
        Date fechaNacimiento,
        @NotBlank(message = "identificacion no puede ser blanco")
        String identificacion,
        @NotBlank(message = "correo no puede ser blanco")
        @Email(message = "correo debe tener un formato válido")
        String correo,
        @NotBlank(message = "telefono no puede ser blanco")
        String telefono
) {
}
