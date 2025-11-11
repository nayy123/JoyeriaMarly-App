package com.marly.handmade.domain.producto.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class ProductoRepositoryTest {

    @Autowired
    private ProductoRepository productoRepository;

    private Producto producto;

    @BeforeEach
    void setup(){
        producto = Producto.builder()
                .nombre("Collar")
                .precio(20.0)
                .stock(10)
                .fotoPrincipal("")
                .fotoSecundario("")
                .fotoTerciario("")
                .categoria("categoria A")
                .care("")
                .details("")
                .Shipping_info("")
                .build();
        productoRepository.save(producto);
    }


    @DisplayName("Test para verificar que existe un producto por el nombre")
    @Test
    void findByNombre() {
        Producto productoRecuperado = productoRepository.findByNombre(producto.getNombre());

        assertThat(productoRecuperado).isNotNull();
        assertThat(productoRecuperado.getNombre()).isEqualTo("Collar");
    }

    @Test
    void buscarCantidadStock() {
        int stock = productoRepository.buscarCantidadStock(producto.getIdProducto());

        assertThat(stock).isPositive();
        assertThat(stock).isEqualTo(10);
    }
}