package com.marly.handmade.domain.cliente.modal;

import com.marly.handmade.domain.usuario.modal.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Clientes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long id;

    private String nombres;

    private String apellidos;

    private String direccion;

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    private String identificacion;

    @Column(name = "puntos_fidelizacion")
    private Integer puntosFidelizacion;

    private String correo;

    private String telefono;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

}
