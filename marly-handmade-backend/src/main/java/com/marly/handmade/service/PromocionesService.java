package com.marly.handmade.service;

import com.marly.handmade.domain.promociones.data.PromocionesUpdate;
import com.marly.handmade.util.ApacheCommonsUtils;
import org.springframework.stereotype.Service;

import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.domain.promociones.modal.Promociones;
import com.marly.handmade.domain.promociones.repository.PromocionesRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class PromocionesService {
    
    private PromocionesRepository promocionesRepository;
    private ProductoRepository productoRepository;

    public PromocionesService(PromocionesRepository promocionesRepository, ProductoRepository productoRepository) {
        this.promocionesRepository = promocionesRepository;
        this.productoRepository = productoRepository;
    }

    public PromocionesResponse crearPromociones(PromocionesRequest promocionesRequest){
        Producto producto = productoRepository.findById(promocionesRequest.idProducto()).orElseThrow(()->new RuntimeException("NO EXISTE UN PRODUCTO CON EL ID:"+ promocionesRequest.idProducto()));
        boolean existePromocion = promocionesRepository.existsByProducto(producto);

    ApacheCommonsUtils.requireNonNullRuntime(existePromocion, "El producto con ID " + producto.getIdProducto() + " ya tiene una promoción.");

        Promociones promociones = Promociones.builder()
        .nombre(promocionesRequest.nombre())
        .descripcion(promocionesRequest.descripcion())
        .fechaInicio(promocionesRequest.fechaInicio())
        .fechaFin(promocionesRequest.fechaFin())
        .porcentajeDescuento(promocionesRequest.porcentajeDescuento())
        .producto(producto)
        .build();

        promocionesRepository.save(promociones);
        return new PromocionesResponse(promociones, producto);
    }

    public PromocionesResponse update(long id, PromocionesUpdate promocionesUpdate) {
        Promociones promo = promocionesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe una promoción con ID: " + id));

        Long productoId = promocionesUpdate.productoId();

        if (productoId != null) {
            Producto producto = productoRepository.findById(productoId)
                    .orElseThrow(() -> new RuntimeException("No existe un producto con ID: " + productoId));

            promocionesRepository.findByProducto_Id(productoId).ifPresent(p -> {
                throw new RuntimeException("Ya existe una promoción con ese producto");
            });

            promo.update(promocionesUpdate, producto);
        } else {
            promo.update(promocionesUpdate, promo.getProducto());
        }

        promocionesRepository.save(promo);
        return new PromocionesResponse(promo, promo.getProducto());
    }


    public List<PromocionesResponse> listarPromociones(){
        return promocionesRepository.findAll().stream().map(promocion -> new PromocionesResponse(promocion, promocion.getProducto())).toList();
    }

    public PromocionesResponse mostrarPorNombre(String nombre) {
        Producto producto = productoRepository.findByNombre(nombre);
        ApacheCommonsUtils.requireNonNullRuntime(producto, "El producto con ese nombre no existe");
        Promociones promociones = promocionesRepository.findByProducto(producto);
        ApacheCommonsUtils.requireNonNullRuntime(promociones, "No existe una promoción para ese producto");

        return new PromocionesResponse(promociones, producto);
    }

    public PromocionesResponse mostrarPorId(long id) {
        Promociones promociones = promocionesRepository.findById(id).orElseThrow(() -> new RuntimeException("La promoción con ese id no existe"));
        Producto producto = promociones.getProducto();
        return new PromocionesResponse(promociones, producto);
    }
    @Transactional
    public void eliminarPromocionPorId(long id) {
        Promociones promociones = promocionesRepository.findById(id).orElseThrow(() -> new RuntimeException("La promoción con ese ID no existe"));
        promocionesRepository.delete(promociones);
    }

    @Transactional
    public void eliminarPromocionPorNombre(String nombre) {
        Promociones promociones = promocionesRepository.findByNombre(nombre).orElseThrow(() -> new RuntimeException("La promoción con ese nombre no existe"));
        promocionesRepository.delete(promociones);
    }

}
