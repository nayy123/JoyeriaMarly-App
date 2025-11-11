package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.usuario.data.request.AutenticacionDto;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.infrastructure.security.DatosJWTToken;
import com.marly.handmade.infrastructure.security.TokenService;
import com.marly.handmade.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("auth")
@Slf4j
public class AutenticacionController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioService usuarioService;

    public AutenticacionController(AuthenticationManager authenticationManager, TokenService tokenService, UsuarioService usuarioService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("login")
    public ResponseEntity<DatosJWTToken> autenticar(@RequestBody @Valid AutenticacionDto autenticacionDto){
        Authentication authentication = new UsernamePasswordAuthenticationToken(autenticacionDto.username(), autenticacionDto.password());
        var usuarioAutenticado = authenticationManager.authenticate(authentication);
        String JWTToken = tokenService.generarToken((Usuario) usuarioAutenticado.getPrincipal());
        log.info("Usuario autenticado correctamente: username: {}", autenticacionDto.username());
        return ResponseEntity.ok(new DatosJWTToken(JWTToken));
    }

    @PostMapping("register")
    public ResponseEntity<RespuestaRegistro> registrar(@RequestBody @Valid RegistrarUsuario registrarUsuario, UriComponentsBuilder builder){
        RespuestaRegistro usuarioCreado =  usuarioService.registrar(registrarUsuario);
        URI uri = builder.path("/usuario/{id}").buildAndExpand(usuarioCreado.id()).toUri();
        log.info("Usuario registrado correctamente: username: {}, uri = {}", usuarioCreado.username(), uri);
        return ResponseEntity.created(uri).body(usuarioCreado);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<RespuestaForgotPassword> resetPassword(@RequestBody @Valid ForgetPassword forgetPassword) throws Exception {
        return ResponseEntity.ok(usuarioService.forgotPassword(forgetPassword));
    }

    @PatchMapping("update-password")
    @Transactional
    public ResponseEntity<RespuestaForgotPassword> updatePassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest){
        RespuestaForgotPassword forgotPassword = usuarioService.updatePassword(resetPasswordRequest);
        log.info("Actualizado correctamente: msj={}", forgotPassword.mensage());
        return ResponseEntity.ok(forgotPassword);
    }
}
