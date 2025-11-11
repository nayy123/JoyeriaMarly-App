package com.marly.handmade.domain.detallePedido.data;

import com.marly.handmade.domain.detallePedido.modal.DetallePedido;

public record DetallePedidoResponse(
        String nombreProducto,
        int cantidad,
        double precioUnitario
) {
    public DetallePedidoResponse(DetallePedido detalle) {
        this(
                detalle.getProducto() != null ? detalle.getProducto().getNombre() : null,
                detalle.getCantidad(),
                detalle.getPrecioUnitario()
        );
    }
}

