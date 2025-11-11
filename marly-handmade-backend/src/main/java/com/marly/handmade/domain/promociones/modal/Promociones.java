package com.marly.handmade.domain.promociones.modal;

import com.marly.handmade.domain.promociones.data.PromocionesUpdate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

import com.marly.handmade.domain.producto.modal.Producto;


@Entity
@Table (name = "promociones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class Promociones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_promocion")
    private Long idPromociones;

    private String nombre;

    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private  LocalDate fechaFin;

    @Column(name = "porcentaje_descuento")
    private float porcentajeDescuento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto")

    private Producto producto;

    public void update(PromocionesUpdate promocionesUpdate, Producto producto) {
        if (promocionesUpdate.nombre() != null) setNombre(promocionesUpdate.nombre());
        if (promocionesUpdate.descripcion() != null) setDescripcion(promocionesUpdate.descripcion());
        if (promocionesUpdate.fechaInicio() != null) setFechaInicio(promocionesUpdate.fechaInicio());
        if (promocionesUpdate.fechaFin() != null) setFechaFin(promocionesUpdate.fechaFin());
        if (promocionesUpdate.porcentajeDescuento() != null) setPorcentajeDescuento(promocionesUpdate.porcentajeDescuento());
        if (promocionesUpdate.productoId() != null) setProducto(producto);
    }

}