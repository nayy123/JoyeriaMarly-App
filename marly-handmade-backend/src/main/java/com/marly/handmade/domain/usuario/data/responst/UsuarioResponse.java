package com.marly.handmade.domain.usuario.data.responst;

import com.marly.handmade.domain.usuario.modal.Usuario;

import com.marly.handmade.domain.usuario.modal.Rol;

public record UsuarioResponse(
        Long id,
        String username,
        Rol rol,
        Boolean estado
) {
    public UsuarioResponse(Usuario usuario) {
        this(
            usuario.getId(),
            usuario.getUsername(),
            usuario.getRol(),
            usuario.getEstado()
        );
    }
}
