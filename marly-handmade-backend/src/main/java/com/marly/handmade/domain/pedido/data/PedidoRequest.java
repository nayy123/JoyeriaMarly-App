package com.marly.handmade.domain.pedido.data;

import com.marly.handmade.domain.detallePedido.data.DetallePedidoRequest;
import jakarta.validation.constraints.Size;
import java.util.List;

public record PedidoRequest(
        @Size(message = "Debe haber al menos un producto",min = 1)
        List<DetallePedidoRequest> detallePedido
) {
}
