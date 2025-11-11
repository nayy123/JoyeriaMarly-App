package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.detallePedido.modal.DetallePedido;
import com.marly.handmade.domain.detallePedido.repository.DetallePedidoRepository;
import com.marly.handmade.domain.detallePedido.data.DetallePedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class PedidoServiceTest {

    private PedidoRepository pedidoRepository;
    private DetallePedidoRepository detallePedidoRepository;
    private ProductoRepository productoRepository;
    private ClienteRepository clienteRepository;
    private PedidoService pedidoService;

    @BeforeEach
    void setup() {
        pedidoRepository = Mockito.mock(PedidoRepository.class);
        detallePedidoRepository = Mockito.mock(DetallePedidoRepository.class);
        productoRepository = Mockito.mock(ProductoRepository.class);
        clienteRepository = Mockito.mock(ClienteRepository.class);
        pedidoService = new PedidoService(pedidoRepository, detallePedidoRepository, productoRepository, clienteRepository);
    }

    private void mockSecurityContextWithUsuario(Usuario usuario) {
        Authentication auth = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
        SecurityContext ctx = Mockito.mock(SecurityContext.class);
        BDDMockito.given(ctx.getAuthentication()).willReturn(auth);
        SecurityContextHolder.setContext(ctx);
    }

    @Test
    void createPedido_happyPath() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setRol(Rol.CLIENTE);
        Cliente cliente = Cliente.builder().id(2L).nombres("Juan").direccion("Calle 1").usuario(usuario).build();
        mockSecurityContextWithUsuario(usuario);

        DetallePedidoRequest detalle = new DetallePedidoRequest(2, 10L);
        PedidoRequest request = new PedidoRequest(List.of(detalle));

        Producto producto = Producto.builder().idProducto(10L).nombre("joya").precio(50.0).stock(5).build();

        BDDMockito.given(clienteRepository.findByUsuario_Id(1L)).willReturn(cliente);
        BDDMockito.given(productoRepository.findById(10L)).willReturn(Optional.of(producto));

        Pedido savedPedido = Pedido.builder().idPedido(1L).fechaPedido(new Date()).direccionEnvio(cliente.getDireccion()).cliente(cliente).total(100.0).estado(false).build();
        BDDMockito.given(pedidoRepository.save(Mockito.any(Pedido.class))).willReturn(savedPedido);

        PedidoResponse resp = pedidoService.createPedido(request);

        assertThat(resp.id()).isEqualTo(1L);
        assertThat(resp.total()).isEqualTo(100.0);

        Mockito.verify(productoRepository, Mockito.atLeastOnce()).save(Mockito.any(Producto.class));
    }

    @Test
    void updatePedido_setsEstadoTrue() {
        Pedido p = Pedido.builder().idPedido(1L).estado(false).build();
        BDDMockito.given(pedidoRepository.findById(1L)).willReturn(Optional.of(p));

        pedidoService.updatePedido(1L);

        Mockito.verify(pedidoRepository).save(Mockito.argThat(arg -> arg.getEstado()));
    }

    @Test
    void listarYMostrarYListarPorEstado() {
        Cliente cliente = Cliente.builder().id(2L).nombres("Juan").build();
        Pedido pedido = Pedido.builder().idPedido(1L).cliente(cliente).build();
        DetallePedido detalle = DetallePedido.builder().cantidad(1).precioUnitario(10.0).pedido(pedido).build();

        BDDMockito.given(pedidoRepository.findAll()).willReturn(List.of(pedido));
        BDDMockito.given(detallePedidoRepository.findByPedido_IdPedido(1L)).willReturn(List.of(detalle));
        BDDMockito.given(pedidoRepository.findAllByCliente_Nombres("Juan")).willReturn(List.of(pedido));
        BDDMockito.given(pedidoRepository.findById(1L)).willReturn(Optional.of(pedido));
        BDDMockito.given(pedidoRepository.findAllByEstado(false)).willReturn(List.of(pedido));

        assertThat(pedidoService.listarPedidos()).hasSize(1);
        assertThat(pedidoService.listarPedidoPorCliente("Juan")).hasSize(1);
        assertThat(pedidoService.mostrarPedidosPorId(1L).id()).isEqualTo(1L);
        assertThat(pedidoService.listarPedidoPorestado(false)).hasSize(1);
    }

}
