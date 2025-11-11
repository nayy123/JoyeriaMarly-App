package com.marly.handmade.domain.promociones.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import com.marly.handmade.domain.promociones.modal.Promociones;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromocionesRepository extends JpaRepository<Promociones,Long> {
    Promociones findByProducto(Producto producto);
    Optional<Promociones> findByNombre(String nombre);
    boolean existsByProducto(Producto producto);

    List<Promociones> findByIdPromociones(Long idPromociones);

    @Query("SELECT p.producto.idProducto FROM Promociones p WHERE p.producto.idProducto = :productoId")
    Optional<Long> findByProducto_Id(Long productoId);
}
