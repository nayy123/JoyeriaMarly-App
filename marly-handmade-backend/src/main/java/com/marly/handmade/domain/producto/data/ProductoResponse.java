package com.marly.handmade.domain.producto.data;

import com.marly.handmade.domain.producto.modal.Producto;

public record ProductoResponse(
        Long id,
        String nombre,
        Double precio,
        Integer stock,
        String fotoPrincipal,
        String fotoSecundario,
        String fotoTerciario,
        String categoria,
        String details,
        String care,
        String shippingInfo,
        String descripcion,
        Boolean status) {

    public ProductoResponse(Producto producto) {
    this(
        producto.getIdProducto(),     // Long id
        producto.getNombre(),         // String nombre
        producto.getPrecio(),         // Double precio
        producto.getStock(),          // Integer stock
        producto.getFotoPrincipal(),  // String fotoPrincipal
        producto.getFotoSecundario(), // String fotoSecundario
        producto.getFotoTerciario(),  // String fotoTerciario
        producto.getCategoria(),      // String categoria
        producto.getDetails(),        // String details
        producto.getCare(),           // String care
        producto.getShippingInfo(),
        producto.getDescripcion(),
            producto.getStatus()
    );
}

}
