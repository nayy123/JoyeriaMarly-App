package com.marly.handmade.domain.clienteFavorito.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavorito;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavoritoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteFavoritoRepository extends JpaRepository<ClienteFavorito, ClienteFavoritoId> {
    List<ClienteFavorito> findByCliente(Cliente cliente);
}
