package com.marly.handmade.domain.cliente.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByCorreo(String correo);

    @Query("SELECT c.id FROM Cliente c WHERE c.correo = :correo")
    Long idClientefindByCorreo(String correo);

    Cliente findByCorreo(String correo);
}
