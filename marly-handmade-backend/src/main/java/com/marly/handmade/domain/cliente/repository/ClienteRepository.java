package com.marly.handmade.domain.cliente.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByCorreo(String correo);

    @Query("SELECT c.id FROM Cliente c WHERE c.correo = :correo")
    Long idClientefindByCorreo(String correo);

    Cliente findByCorreo(String correo);

    Cliente findByUsuario_Id(Long id);

    boolean existsByIdentificacion(String identificacion);

    Cliente findByUsuario_Username(String username);

    @Query(value = """
                SELECT
                id_cliente, usuarios.username, nombres, apellidos, direccion, fecha_nacimiento, identificacion, puntos_fidelizacion, correo, telefono
                FROM usuarios
                INNER JOIN clientes
                ON usuarios.id_usuario = clientes.id_usuario
                WHERE usuarios.rol = 1;
                """, nativeQuery = true)
    List<ClienteConUsuarioResponse> listarClientesConRol1();

}
