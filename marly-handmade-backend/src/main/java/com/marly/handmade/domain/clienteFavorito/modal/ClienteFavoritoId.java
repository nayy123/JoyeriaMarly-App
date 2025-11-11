package com.marly.handmade.domain.clienteFavorito.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ClienteFavoritoId implements Serializable {
    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "id_producto")
    private Long idProducto;
}
