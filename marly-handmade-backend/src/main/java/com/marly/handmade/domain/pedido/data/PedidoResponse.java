package com.marly.handmade.domain.pedido.data;

import com.marly.handmade.domain.cliente.data.response.DatosCliente;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.detallePedido.data.DetallePedidoResponse;
import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import com.marly.handmade.domain.pedido.modal.Pedido;

import java.util.Date;
import java.util.List;

public record PedidoResponse(
        Long id,
        Date fechaPedido,
        String direccionEnvio,
        Double total,
        DatosCliente cliente,
        List<DetallePedidoResponse> detallesPedido
) {
    public PedidoResponse(Pedido pedido, Cliente cliente, List<DetallePedido> detallesPedido) {
        this(
                pedido.getIdPedido(),
                pedido.getFechaPedido(),
                pedido.getDireccionEnvio(),
                pedido.getTotal(),
                new DatosCliente(cliente),
                detallesPedido.stream()
                        .map(DetallePedidoResponse::new)
                        .toList()
        );
    }
}

