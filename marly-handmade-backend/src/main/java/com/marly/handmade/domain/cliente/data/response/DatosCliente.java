package com.marly.handmade.domain.cliente.data.response;

import com.marly.handmade.domain.cliente.modal.Cliente;

public record DatosCliente(
        String nombres,
        String apellidos,
        String correo,
        String telefono
) {
    public DatosCliente(Cliente cliente) {
        this(cliente.getNombres(), cliente.getApellidos(), cliente.getCorreo(), cliente.getTelefono());
    }
}
