package com.marly.handmade.domain.producto.modal;

import com.marly.handmade.domain.producto.data.ProductoUpdate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Productos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducto;

    private String nombre;

    private String descripcion;

    private Double precio;

    private Integer stock;

    @Column(name = "foto_principal")
    private String fotoPrincipal;

    @Column(name = "foto_secundario")
    private String fotoSecundario;

    @Column(name = "foto_terciario")
    private String fotoTerciario;

    private String categoria;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(columnDefinition = "TEXT")
    private String care;
    
    @Column(name = "shipping_info", columnDefinition = "TEXT")
    private String shippingInfo; // ✅ camelCase

    private Boolean status;

    public void update(ProductoUpdate productoUpdate) {
        if (productoUpdate.nombre() != null)
            setNombre(productoUpdate.nombre());
        if (productoUpdate.precio() != null)
            setPrecio(productoUpdate.precio());
        if (productoUpdate.stock() != null)
            setStock(productoUpdate.stock());
        if (productoUpdate.fotoPrincipal() != null)
            setFotoPrincipal(productoUpdate.fotoPrincipal());
        if (productoUpdate.fotoSecundario() != null)
            setFotoSecundario(productoUpdate.fotoSecundario());
        if (productoUpdate.fotoTerciario() != null)
            setFotoTerciario(productoUpdate.fotoTerciario());
        if (productoUpdate.categoria() != null)
            setCategoria(productoUpdate.categoria());
        if (productoUpdate.descripcion() != null)
            setDescripcion(productoUpdate.descripcion());
        if (productoUpdate.details() != null)
            setDetails(productoUpdate.details());
        if (productoUpdate.care() != null)
            setCare(productoUpdate.care());
        if (productoUpdate.shippingInfo() != null)
            setShippingInfo(productoUpdate.shippingInfo());
        if(productoUpdate.status() != null)
            setStatus(productoUpdate.status());
    }

    public void updateStatus(){
        setStatus(!status);
    }
}
