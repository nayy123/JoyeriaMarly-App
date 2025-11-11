package com.marly.handmade.domain.detallePedido.repository;

import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedido_IdPedido(Long pedidoIdPedido);
}
