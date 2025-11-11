package com.marly.handmade.domain.clienteFavorito.data;

public record ClienteFavoritoRequest(
        Long idUsuario,
        Long idProducto,
        String nombreCliente
) {
}
