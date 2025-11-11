package com.marly.handmade.domain.promociones.data;
import java.time.LocalDate;

public record PromocionesRequest ( 
    String nombre,
    String descripcion,
    LocalDate fechaInicio,
    LocalDate fechaFin,
    Float porcentajeDescuento,
    Long idProducto
) {

}
