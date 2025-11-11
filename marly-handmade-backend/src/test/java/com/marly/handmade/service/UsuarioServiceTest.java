package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.data.request.ClienteDto;
import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import com.marly.handmade.infrastructure.email.EmailSender;
import com.marly.handmade.infrastructure.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @Mock
    private EmailSender emailApiConsumer;

    @InjectMocks
    private UsuarioService usuarioService;

    @DisplayName("Test para probar que se est registrando y no sale exceptiones")
    @Test
    void registrar() throws ParseException {
        // Given: no existe usuario ni cliente con ese correo
        BDDMockito.given(usuarioRepository.existsByUsername("saul21")).willReturn(false);
        BDDMockito.given(clienteRepository.existsByCorreo("saulfernandez@gmail.com")).willReturn(false);
        BDDMockito.given(passwordEncoder.encode("123")).willReturn("encoded123");
        BDDMockito.given(usuarioRepository.save(Mockito.any(Usuario.class))).willReturn(null);
        BDDMockito.given(clienteRepository.save(Mockito.any(Cliente.class))).willReturn(null);
        Date fechaNacimiento = new SimpleDateFormat("dd-MM-yyyy").parse("10-09-1980");
        RegistrarUsuario registrarUsuario = new RegistrarUsuario("saul21", "123",
                new ClienteDto("Saul", "Fernadez Cabrera", "Mz G Lt 1", fechaNacimiento, "26342345", "saulfernandez@gmail.com", "987657923"));

        // When
        RespuestaRegistro usuarioGuardado = usuarioService.registrar(registrarUsuario);

        // Then
        assertThat(usuarioGuardado.correo()).isEqualTo("saulfernandez@gmail.com");
        assertThat(usuarioGuardado.username()).isEqualToIgnoringCase("saul21");
    }

    @DisplayName("Test para probar que se envia el correocuando los datos son correctos")
    @Test
    void forgotPassword() throws Exception {
        Usuario usuario = new Usuario();
        Cliente cliente = new Cliente();
        cliente.setUsuario(usuario);
        cliente.setNombres("Saúl");
        ForgetPassword forgetPassword = new ForgetPassword("noexiste@gmail.com");
        BDDMockito.given(clienteRepository.findByCorreo(forgetPassword.email())).willReturn(cliente);
        BDDMockito.given(tokenService.generarTokenResetPassword(usuario)).willReturn("fake-token");

        RespuestaForgotPassword respuestaForgotPassword = usuarioService.forgotPassword(forgetPassword);

        assertThat(respuestaForgotPassword.mensage()).isEqualTo("Si este correo existe en nuestro sistema, recibirás un enlace para restablecer la contraseña.");
        verify(emailApiConsumer).sendCorreo(forgetPassword.email(), "fake-token", "Saúl");
    }

}