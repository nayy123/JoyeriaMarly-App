package com.marly.handmade.domain.pedido.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
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
class PedidoRepositoryTest {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Cliente cliente;

    @BeforeEach
    void setup() {
        Usuario usuario = Usuario.builder().username("u1").password("p").rol(Rol.CLIENTE).estado(true).build();
        usuarioRepository.save(usuario);

        cliente = Cliente.builder().nombres("Juan").apellidos("Perez").direccion("Calle").usuario(usuario).build();
        clienteRepository.save(cliente);

        Pedido p = Pedido.builder().fechaPedido(new Date()).direccionEnvio("Calle").total(100.0).cliente(cliente).estado(false).build();
        pedidoRepository.save(p);
    }

    @Test
    void findAllByCliente_Id() {
        assertThat(pedidoRepository.findAllByCliente_Id(cliente.getId())).isNotEmpty();
    }

    @Test
    void findAllByEstado() {
        assertThat(pedidoRepository.findAllByEstado(false)).isNotEmpty();
    }

    @Test
    void findAllByCliente_Nombres() {
        assertThat(pedidoRepository.findAllByCliente_Nombres("Juan")).isNotEmpty();
    }
}
