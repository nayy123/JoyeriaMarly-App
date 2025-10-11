package com.marly.handmade.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import com.marly.handmade.infrastructure.email.EmailApiConsumer;
import com.marly.handmade.infrastructure.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final EmailApiConsumer emailApiConsumer;

    public RespuestaRegistro registrar(RegistrarUsuario registrarUsuario) {
        if (usuarioRepository.existsByUsername(registrarUsuario.username())) {
            throw new IllegalArgumentException("El username ya está en uso");
        }
        if (clienteRepository.existsByCorreo(registrarUsuario.cliente().correo())) {
            throw new IllegalArgumentException("El correo ya está en uso");
        }

        Usuario usuario = Usuario.builder()
                .username(registrarUsuario.username())
                .password(passwordEncoder.encode(registrarUsuario.password()))
                .rol(Rol.Cliente)
                .estado(true)
                .build();
        Cliente cliente = Cliente.builder()
                .nombres(registrarUsuario.cliente().nombres())
                .apellidos(registrarUsuario.cliente().apellidos())
                .direccion(registrarUsuario.cliente().direccion())
                .fechaNacimiento(registrarUsuario.cliente().fechaNacimiento())
                .identificacion(registrarUsuario.cliente().identificacion())
                .correo(registrarUsuario.cliente().correo())
                .telefono(registrarUsuario.cliente().telefono())
                .puntosFidelizacion(0)
                .usuario(usuario)
                .build();

        usuarioRepository.save(usuario);
        clienteRepository.save(cliente);

        return new RespuestaRegistro(usuario.getId(), usuario.getUsername(), cliente.getCorreo());
    }

    public RespuestaForgotPassword forgotPassword(@Valid ForgetPassword forgetPassword) throws Exception {
        Cliente cliente = clienteRepository.findByCorreo(forgetPassword.email());
        Usuario usuario = cliente.getUsuario();
        String token = tokenService.generarTokenResetPassword(usuario);
        emailApiConsumer.sendCorreo(forgetPassword.email(), token, cliente.getNombres());
        return new RespuestaForgotPassword("Si este correo existe en nuestro sistema, recibirás un enlace para restablecer la contraseña.");
    }

    public RespuestaForgotPassword updatePassword(ResetPasswordRequest resetPasswordRequest) {
        DecodedJWT decodedJWT = tokenService.verifyToken(resetPasswordRequest.token());

        String tipo = decodedJWT.getClaim("tipo").asString();
        if (tipo == null || !tipo.equals("reset-password")) {
            throw new RuntimeException("Token inválido para resetear contraseña");
        }

        String username = decodedJWT.getSubject();
        Usuario usuario = usuarioRepository.findByUsername(username);
        
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        String newEncodedPassword = passwordEncoder.encode(resetPasswordRequest.newPassword());
        usuario.setPassword(newEncodedPassword);
        
        usuarioRepository.save(usuario);
        
        usuarioRepository.flush();
        
        usuarioRepository.findByUsername(username);

        return new RespuestaForgotPassword("Contraseña actualizada correctamente");
    }

}
