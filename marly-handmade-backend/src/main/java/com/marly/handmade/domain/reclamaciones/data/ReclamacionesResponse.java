package com.marly.handmade.domain.reclamaciones.data;

import com.marly.handmade.domain.reclamaciones.modal.Reclamaciones;

import java.util.Date;

public record ReclamacionesResponse(
        Long id,
        String descripcion,
        Date fechaReclamo,
        String clienteNombre

) {

    public ReclamacionesResponse(Reclamaciones reclamaciones, String cliente){
        this(reclamaciones.getIdReclamo(), reclamaciones.getDescripcion(), reclamaciones.getFechaReclamo(), cliente);
    }


}
