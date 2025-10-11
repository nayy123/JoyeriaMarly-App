package com.marly.handmade.controller;

import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.usuario.data.request.AutenticacionDto;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.service.UsuarioService;
import com.marly.handmade.infrastructure.security.DatosJWTToken;
import com.marly.handmade.infrastructure.security.TokenService;
import jakarta.validation.Valid;
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
        return ResponseEntity.ok(new DatosJWTToken(JWTToken));
    }

    @PostMapping("register")
    @Transactional
    public ResponseEntity<Void> registrar(@RequestBody @Valid RegistrarUsuario registrarUsuario, UriComponentsBuilder builder){
        RespuestaRegistro usuarioCreado =  usuarioService.registrar(registrarUsuario);
        URI uri = builder.path("/usuario/{id}").buildAndExpand(usuarioCreado.id()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("forgot-password")
    public ResponseEntity<RespuestaForgotPassword> resetPassword(@RequestBody @Valid ForgetPassword forgetPassword) throws Exception {
        RespuestaForgotPassword respuestaForgotPassword =  usuarioService.forgotPassword(forgetPassword);
        return ResponseEntity.ok(respuestaForgotPassword);
    }

    @PatchMapping("update-password")
    @Transactional
    public ResponseEntity<RespuestaForgotPassword> updatePassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest){
        RespuestaForgotPassword forgotPassword = usuarioService.updatePassword(resetPasswordRequest);
        return ResponseEntity.ok(forgotPassword);
    }
}
