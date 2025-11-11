package com.marly.handmade.domain.clienteFavorito.data;

import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavorito;


import java.util.Date;

public record ClienteFavoritoResponse(
        Long idCliente,
        Long idProducto,
        Date fechaRegistro,
        String nombreCliente,
        String nombreProducto

) {
    public ClienteFavoritoResponse(ClienteFavorito favorito) {
        this(
                favorito.getId().getIdCliente(),
                favorito.getId().getIdProducto(),
                favorito.getFechaRegistro(),
                favorito.getCliente().getNombres(),
                favorito.getProducto().getNombre()
        );
    }
}
