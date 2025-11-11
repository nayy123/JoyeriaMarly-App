package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.clienteFavorito.data.ClienteFavoritoRequest;
import com.marly.handmade.domain.clienteFavorito.data.ClienteFavoritoResponse;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavorito;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavoritoId;
import com.marly.handmade.domain.clienteFavorito.repository.ClienteFavoritoRepository;
import com.marly.handmade.domain.producto.modal.Producto;
import com.marly.handmade.domain.producto.repository.ProductoRepository;
import com.marly.handmade.domain.usuario.modal.Usuario;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class ClienteFavoritoService {

    private ClienteFavoritoRepository clienteFavoritoRepository;
    private ProductoRepository productoRepository;
    private ClienteRepository clienteRepository;

    public ClienteFavoritoService(ClienteFavoritoRepository clienteFavoritoRepository, ProductoRepository productoRepository, ClienteRepository clienteRepository) {
        this.clienteFavoritoRepository = clienteFavoritoRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
    }

    public ClienteFavoritoResponse agregarFavorito(ClienteFavoritoRequest request) {
        Usuario usuario = obtenerUsuarioAutenticado();
        Cliente cliente = clienteRepository.findByUsuario_Id(usuario.getId());
        if (cliente == null) {
            throw new RuntimeException("No se encontró un cliente asociado al usuario");
        }
        Producto producto = productoRepository.findById(request.idProducto()).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        ClienteFavoritoId id = new ClienteFavoritoId(cliente.getId(), request.idProducto());
        if (clienteFavoritoRepository.existsById(id)) {
            throw new RuntimeException("Este producto ya está en favoritos");
        }
        ClienteFavorito favorito = ClienteFavorito.builder()
                .id(id)
                .cliente(cliente)
                .producto(producto)
                .fechaRegistro(new Date())
                .build();
        clienteFavoritoRepository.save(favorito);
        return new ClienteFavoritoResponse(favorito);
    }

    private Usuario obtenerUsuarioAutenticado() {
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public List<ClienteFavorito> listarFavoritosPorUsuarioId(Long idUsuario) {
        Cliente cliente = clienteRepository.findByUsuario_Id(idUsuario);
        if (cliente == null) {
            throw new RuntimeException("Cliente no encontrado para el usuario " + idUsuario);
        }

        return clienteFavoritoRepository.findByCliente(cliente);
    }

    public List<ClienteFavorito> listarFavoritosPorIdCliente(Long idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente).orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + idCliente));

        return clienteFavoritoRepository.findByCliente(cliente);
    }

    public List<ClienteFavorito> listarFavoritosPorUsername(String username) {
        Cliente cliente = clienteRepository.findByUsuario_Username(username);
        if (cliente == null) {
            throw new RuntimeException("Cliente no encontrado para el usuario: " + username);
        }

        return clienteFavoritoRepository.findByCliente(cliente);
    }

    @Transactional
    public void eliminarFavoritoPorId(Long idCliente, Long idProducto) {
        ClienteFavoritoId id = new ClienteFavoritoId(idCliente, idProducto);
        ClienteFavorito favorito = clienteFavoritoRepository.findById(id).orElseThrow(() -> new RuntimeException("El producto favorito con ese ID no existe"));
        clienteFavoritoRepository.delete(favorito);
    }

}
