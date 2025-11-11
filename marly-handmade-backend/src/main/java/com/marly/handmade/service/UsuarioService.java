package com.marly.handmade.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.data.responst.UsuarioResponse;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import com.marly.handmade.infrastructure.email.EmailSender;
import com.marly.handmade.infrastructure.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.marly.handmade.util.GuavaUtils;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final EmailSender emailApiConsumer;

    public RespuestaRegistro registrar(RegistrarUsuario registrarUsuario) {
        GuavaUtils.checkArgumentRuntime(
                !clienteRepository.existsByIdentificacion(registrarUsuario.cliente().identificacion()),
                "La identificacion ya está en uso");
        GuavaUtils.checkArgumentRuntime(!usuarioRepository.existsByUsername(registrarUsuario.username()),
                "El username ya está en uso");
        GuavaUtils.checkArgumentRuntime(!clienteRepository.existsByCorreo(registrarUsuario.cliente().correo()),
                "El correo ya está en uso");

        Usuario usuario = Usuario.builder()
                .username(registrarUsuario.username())
                .password(passwordEncoder.encode(registrarUsuario.password()))
                .rol(Rol.CLIENTE)
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
        if (cliente == null) {
            log.warn("Solicitud de reset de contraseña para email no registrado: {}", forgetPassword.email());
            throw new RuntimeException("No existe un cliente con ese email");
        }
        Usuario usuario = cliente.getUsuario();
        String token = tokenService.generarTokenResetPassword(usuario);
        emailApiConsumer.sendCorreo(forgetPassword.email(), token, cliente.getNombres());

        log.info("Correo de reset de contraseña enviado a: {}", forgetPassword.email());
        return new RespuestaForgotPassword(
                "Si este correo existe en nuestro sistema, recibirás un enlace para restablecer la contraseña.");
    }

    public RespuestaForgotPassword updatePassword(ResetPasswordRequest resetPasswordRequest) {
        DecodedJWT decodedJWT = tokenService.verifyToken(resetPasswordRequest.token());

        String tipo = decodedJWT.getClaim("tipo").asString();
        GuavaUtils.requireNonNullRuntime(tipo, "Token inválido para resetear contraseña");
        GuavaUtils.checkArgumentRuntime(!"reset-password".equals(tipo), "Token inválido para resetear contraseña");

        String username = decodedJWT.getSubject();
        Usuario usuario = usuarioRepository.findByUsername(username);
        GuavaUtils.requireNonNullRuntime(usuario, "Usuario no encontrado");

        String newEncodedPassword = passwordEncoder.encode(resetPasswordRequest.newPassword());
        usuario.setPassword(newEncodedPassword);

        usuarioRepository.save(usuario);
        usuarioRepository.flush();

        log.info("Contraseña actualizada correctamente para usuario: {}", username);
        return new RespuestaForgotPassword("Contraseña actualizada correctamente");
    }

    public List<UsuarioResponse> listarUsuarios() {
        var usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(UsuarioResponse::new)
                .toList();
    }
}
