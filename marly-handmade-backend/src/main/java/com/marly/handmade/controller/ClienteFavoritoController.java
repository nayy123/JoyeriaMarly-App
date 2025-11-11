package com.marly.handmade.controller;

import com.marly.handmade.domain.clienteFavorito.data.ClienteFavoritoRequest;
import com.marly.handmade.domain.clienteFavorito.data.ClienteFavoritoResponse;
import com.marly.handmade.domain.clienteFavorito.modal.ClienteFavorito;
import com.marly.handmade.service.ClienteFavoritoService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("favorito")
public class ClienteFavoritoController {
    private ClienteFavoritoService clienteFavoritoService;

    public ClienteFavoritoController(ClienteFavoritoService clienteFavoritoService){
        this.clienteFavoritoService = clienteFavoritoService;
    }

    @PostMapping
    public ResponseEntity<ClienteFavoritoResponse> agregarFavorito (@RequestBody @Valid ClienteFavoritoRequest clienteFavoritoRequest, UriComponentsBuilder builder){
        ClienteFavoritoResponse clienteFavoritoResponse = clienteFavoritoService.agregarFavorito(clienteFavoritoRequest);
        URI uri = builder.path("/favorito/{idCliente}/{idProducto}").buildAndExpand(clienteFavoritoResponse.idCliente(), clienteFavoritoResponse.idProducto()).toUri();
        return ResponseEntity.created(uri).body(clienteFavoritoResponse);
    }

    @GetMapping("/listar/id")
    public ResponseEntity<List<ClienteFavorito>> listarFavoritosPorUsuarioId(@RequestParam Long idUsuario) {
    List<ClienteFavorito> favoritos = clienteFavoritoService.listarFavoritosPorUsuarioId(idUsuario);
    return ResponseEntity.ok(favoritos);
    }

    @GetMapping("/listar/cliente")
    public ResponseEntity<List<ClienteFavorito>> listarFavoritosPorIdCliente(@RequestParam Long idCliente) {
        List<ClienteFavorito> favoritos = clienteFavoritoService.listarFavoritosPorIdCliente(idCliente);
        return ResponseEntity.ok(favoritos);
    }

    @GetMapping("/listar/username")
    public ResponseEntity<List<ClienteFavorito>> listarFavoritosPorUsername(@RequestParam String username) {
        List<ClienteFavorito> favoritos = clienteFavoritoService.listarFavoritosPorUsername(username);
        return ResponseEntity.ok(favoritos);
    }

    @DeleteMapping("/{idCliente}/{idProducto}")
    public ResponseEntity<Void> eliminarFavorito(@PathVariable Long idCliente, @PathVariable Long idProducto) {
        clienteFavoritoService.eliminarFavoritoPorId(idCliente, idProducto);
        return ResponseEntity.noContent().build();
    }
}
