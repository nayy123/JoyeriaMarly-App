package com.marly.handmade.domain.usuario.data.responst;

public interface ClienteConUsuarioResponse {
    Long getIdCliente();
    String getUsername();
    String getNombres();
    String getApellidos();
    String getDireccion();
    String getFechaNacimiento();
    String getIdentificacion();
    Integer getPuntosFidelizacion();
    String getCorreo();
    String getTelefono();
}
