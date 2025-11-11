package com.marly.handmade.domain.reclamaciones.modal;

import java.util.Date;

import com.marly.handmade.domain.cliente.modal.Cliente;
import jakarta.persistence.*;
import lombok.*;


@Entity 
@Table (name = "libroreclamaciones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reclamaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_reclamo")
    private Long idReclamo;

    private String descripcion;

    @Column (name = "fecha_reclamo")
    private Date fechaReclamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

}
