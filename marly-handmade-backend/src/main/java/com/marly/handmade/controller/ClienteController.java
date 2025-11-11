package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.responst.ClienteConUsuarioResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteRepository clienteRepository;
// nuevo endpoint
    @GetMapping("/all")
    public List<ClienteConUsuarioResponse> listarClientesRol1() {
        return clienteRepository.listarClientesConRol1();
    }

}

