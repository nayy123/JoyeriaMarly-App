package com.marly.handmade.domain.pedido.modal;

import com.marly.handmade.domain.cliente.modal.Cliente;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Pedidos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @Column(name = "fecha_pedido")
    private Date fechaPedido;

    private Boolean estado;

    @Column(name = "direccion_envio")
    private String direccionEnvio;

    private Double total;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
}
