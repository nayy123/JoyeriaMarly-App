package com.marly.handmade.controller;

import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import com.marly.handmade.infrastructure.security.TokenService;
import org.springframework.boot.test.mock.mockito.MockBean;

public abstract class ControllerTestBase {

    @MockBean
    protected TokenService tokenService;

    @MockBean
    protected UsuarioRepository usuarioRepository;
}
