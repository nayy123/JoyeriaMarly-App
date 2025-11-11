package com.marly.handmade.domain.pedido.repository;

import com.marly.handmade.domain.pedido.modal.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByCliente_Id(long id);

    List<Pedido> findAllByEstado(boolean estado);

    Collection<Pedido> findAllByCliente_Nombres(String clienteNombres);
}
