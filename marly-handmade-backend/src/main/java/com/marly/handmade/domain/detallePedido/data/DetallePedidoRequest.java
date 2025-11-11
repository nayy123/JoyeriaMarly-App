package com.marly.handmade.domain.detallePedido.data;

public record DetallePedidoRequest(
        int cantidad,
        long idProducto
) {
}
