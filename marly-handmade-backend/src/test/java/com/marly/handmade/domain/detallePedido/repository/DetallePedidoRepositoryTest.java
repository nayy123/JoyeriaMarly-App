package com.marly.handmade.domain.detallePedido.repository;

import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class DetallePedidoRepositoryTest {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    private Pedido pedido;

    @BeforeEach
    void setup() {
        pedido = Pedido.builder().fechaPedido(new Date()).direccionEnvio("Calle").total(10.0).estado(false).build();
        pedidoRepository.save(pedido);

        DetallePedido d = DetallePedido.builder().cantidad(1).precioUnitario(10.0).pedido(pedido).build();
        detallePedidoRepository.save(d);
    }

    @Test
    void findByPedido_IdPedido() {
        assertThat(detallePedidoRepository.findByPedido_IdPedido(pedido.getIdPedido())).isNotEmpty();
    }
}
