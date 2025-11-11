package com.marly.handmade.domain.producto.repository;

import com.marly.handmade.domain.producto.modal.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto findByNombre(String nombre);

    @Query("SELECT p.stock FROM Producto p WHERE p.idProducto = :id")
    int buscarCantidadStock(Long id);
}
