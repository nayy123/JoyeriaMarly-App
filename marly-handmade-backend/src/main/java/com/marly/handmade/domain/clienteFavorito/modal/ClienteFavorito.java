package com.marly.handmade.domain.clienteFavorito.modal;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.producto.modal.Producto;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity(name = "clientefavorito")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteFavorito {

    @EmbeddedId
    private ClienteFavoritoId id;

    @ManyToOne
    @MapsId("idCliente")
    @JoinColumn(name = "id_cliente", insertable = false, updatable = false)
    private Cliente cliente;

    @ManyToOne
    @MapsId("idProducto")
    @JoinColumn(name = "id_producto", insertable = false, updatable = false)
    private Producto producto;

    @Column (name = "fecha_registro")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;
}
