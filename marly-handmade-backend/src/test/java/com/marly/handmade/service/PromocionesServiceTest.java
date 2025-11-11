package com.marly.handmade.service;

import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.domain.promociones.modal.Promociones;
import com.marly.handmade.domain.promociones.repository.PromocionesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class PromocionesServiceTest {

    private PromocionesRepository promocionesRepository;
    private ProductoRepository productoRepository;
    private PromocionesService promocionesService;

    @BeforeEach
    void setup() {
        promocionesRepository = Mockito.mock(PromocionesRepository.class);
        productoRepository = Mockito.mock(ProductoRepository.class);
        promocionesService = new PromocionesService(promocionesRepository, productoRepository);
    }

    @Test
    void crearPromociones_happyPath() {
        Producto producto = Producto.builder().idProducto(1L).nombre("joya").build();
        PromocionesRequest req = new PromocionesRequest("PromoA", "Desc", LocalDate.now(), LocalDate.now().plusDays(5), 10.0f, 1L);

        BDDMockito.given(productoRepository.findById(1L)).willReturn(Optional.of(producto));
        BDDMockito.given(promocionesRepository.existsByProducto(producto)).willReturn(false);

        Promociones saved = Promociones.builder().idPromociones(1L).nombre(req.nombre()).descripcion(req.descripcion()).fechaInicio(req.fechaInicio()).fechaFin(req.fechaFin()).porcentajeDescuento(req.porcentajeDescuento()).producto(producto).build();
        BDDMockito.given(promocionesRepository.save(Mockito.any(Promociones.class))).willReturn(saved);

        PromocionesResponse resp = promocionesService.crearPromociones(req);
        assertThat(resp.nombre()).isEqualTo("PromoA");
        assertThat(resp.producto().nombre()).isEqualTo("joya");
    }

    @Test
    void listarYMostrarPorNombre() {
        Producto producto = Producto.builder().idProducto(1L).nombre("joya").build();
        Promociones p = Promociones.builder().idPromociones(1L).nombre("PromoA").producto(producto).build();

        BDDMockito.given(promocionesRepository.findAll()).willReturn(List.of(p));
        BDDMockito.given(productoRepository.findByNombre("joya")).willReturn(producto);
        BDDMockito.given(promocionesRepository.findByProducto(producto)).willReturn(p);

        assertThat(promocionesService.listarPromociones()).hasSize(1);
        PromocionesResponse byName = promocionesService.mostrarPorNombre("joya");
        assertThat(byName.nombre()).isEqualTo("PromoA");
    }

}
