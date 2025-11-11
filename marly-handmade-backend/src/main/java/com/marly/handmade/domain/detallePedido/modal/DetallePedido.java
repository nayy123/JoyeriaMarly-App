package com.marly.handmade.domain.detallePedido.modal;

import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.producto.modal.Producto;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "detallepedidos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;

    private Integer cantidad;

    private Double precioUnitario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto")
    private Producto producto;
}
