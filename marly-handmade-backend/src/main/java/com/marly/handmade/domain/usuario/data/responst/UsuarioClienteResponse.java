package com.marly.handmade.domain.usuario.data.responst;

public record UsuarioClienteResponse(
        Long idUsuario,
        String username,
        String rol,
        Boolean estado,
        String nombres,
        String apellidos,
        String correo
) {}
