package com.Proyecto.Joyeria_Marly.persistance.mapper;

import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import com.Proyecto.Joyeria_Marly.persistance.entity.CategoriasProductos;
import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-16T11:52:50-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class ProductoMapperImpl implements ProductoMapper {

    @Override
    public Product toProduct(Productos productos) {
        if ( productos == null ) {
            return null;
        }

        Product product = new Product();

        product.setProductId( productos.getIdProducto() );
        product.setName( productos.getNombreProducto() );
        product.setDescription( productos.getDescripcion() );
        product.setPrice( productos.getPrecio() );
        product.setStock( productos.getStock() );
        product.setImageUrl( productos.getImagenUrl() );
        product.setCategoryId( productosCategoriaIdCategoria( productos ) );
        product.setCategoryName( productosCategoriaNombreCategoria( productos ) );

        return product;
    }

    @Override
    public Productos toProductos(Product product) {
        if ( product == null ) {
            return null;
        }

        Productos productos = new Productos();

        productos.setIdProducto( product.getProductId() );
        productos.setNombreProducto( product.getName() );
        productos.setDescripcion( product.getDescription() );
        productos.setPrecio( product.getPrice() );
        productos.setStock( product.getStock() );
        productos.setImagenUrl( product.getImageUrl() );

        return productos;
    }

    private Integer productosCategoriaIdCategoria(Productos productos) {
        if ( productos == null ) {
            return null;
        }
        CategoriasProductos categoria = productos.getCategoria();
        if ( categoria == null ) {
            return null;
        }
        Integer idCategoria = categoria.getIdCategoria();
        if ( idCategoria == null ) {
            return null;
        }
        return idCategoria;
    }

    private String productosCategoriaNombreCategoria(Productos productos) {
        if ( productos == null ) {
            return null;
        }
        CategoriasProductos categoria = productos.getCategoria();
        if ( categoria == null ) {
            return null;
        }
        String nombreCategoria = categoria.getNombreCategoria();
        if ( nombreCategoria == null ) {
            return null;
        }
        return nombreCategoria;
    }
}
