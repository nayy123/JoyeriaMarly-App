package com.marly.handmade.domain.promociones.data;
import java.time.LocalDate;

import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.promociones.modal.Promociones;

public record PromocionesResponse ( 
    Long id,
    String nombre, 
    String descripcion, 
    LocalDate fechaInicio, 
    LocalDate fechaFin,
    Float porcentajeDescuento,
    ProductoResponse producto
) {

    public PromocionesResponse(Promociones promociones, Producto producto){
        this(promociones.getIdPromociones(), promociones.getNombre(), promociones.getDescripcion(), promociones.getFechaInicio(), promociones.getFechaFin(),
        promociones.getPorcentajeDescuento(),new ProductoResponse (producto) );
    }

}