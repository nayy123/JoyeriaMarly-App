package com.marly.handmade.domain.promociones.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.promociones.modal.Promociones;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class PromocionesRepositoryTest {

    @Autowired
    private PromocionesRepository promocionesRepository;

    @Autowired
    private ProductoRepository productoRepository;

    private Producto producto;

    @BeforeEach
    void setup() {
        producto = Producto.builder().nombre("joya").precio(10.0).stock(10).build();
        productoRepository.save(producto);

        Promociones p = Promociones.builder().nombre("PromoA").producto(producto).build();
        promocionesRepository.save(p);
    }

    @Test
    void findByProducto() {
        assertThat(promocionesRepository.findByProducto(producto)).isNotNull();
    }

    @Test
    void existsByProducto() {
        assertThat(promocionesRepository.existsByProducto(producto)).isTrue();
    }
}
