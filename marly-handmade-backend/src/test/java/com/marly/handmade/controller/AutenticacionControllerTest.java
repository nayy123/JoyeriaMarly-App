package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.cliente.data.request.ClienteDto;
import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.usuario.data.request.AutenticacionDto;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Date;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AutenticacionController.class)
@AutoConfigureMockMvc(addFilters = false)

class AutenticacionControllerTest extends ControllerTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private UsuarioService usuarioService;

    @Test
    void autenticar() throws Exception {
        String username = "admin";
        String password = "1234";
        String token = "jwt-token-de-prueba";
        AutenticacionDto autenticacionDto = new AutenticacionDto(username, password);
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(password);
        usuario.setRol(Rol.ADMIN);

        Authentication authenticationMock = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());

        BDDMockito.given(authenticationManager.authenticate(any(Authentication.class))).willReturn(authenticationMock);

        BDDMockito.given(tokenService.generarToken(any(Usuario.class))).willReturn(token);

        ResultActions response = mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(autenticacionDto))
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(token));
    }


    @Test
    void registrar() throws Exception {
        RegistrarUsuario registrarUsuario = new RegistrarUsuario("Boris23", "1234",
                new ClienteDto("Boris", "Fernandez Cabrera", "direccion",  new Date() ,"97657", "borisfernan@gmail.com", "2234"));
        RespuestaRegistro respuestaRegistro = new RespuestaRegistro(1L, "Boris", "borisfernan@gmail.com");
        BDDMockito.given(usuarioService.registrar(any(RegistrarUsuario.class))).willReturn(respuestaRegistro);

        ResultActions response = mockMvc.perform(
                post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registrarUsuario))
        );

        response.andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/usuario/1")))
                .andExpect(jsonPath("$.username").value("Boris"));
    }

    @Test
    void resetPassword() throws Exception {
        ForgetPassword forgetPassword = new ForgetPassword("borisfernan@gmail.com");
        RespuestaForgotPassword respuestaForgotPassword = new RespuestaForgotPassword("Si este correo existe en nuestro sistema, recibirás un enlace para restablecer la contraseña.");
        BDDMockito.given(usuarioService.forgotPassword(forgetPassword)).willReturn(respuestaForgotPassword);

        ResultActions response = mockMvc.perform(
                post("/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(forgetPassword))
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensage").value("Si este correo existe en nuestro sistema, recibirás un enlace para restablecer la contraseña."));

    }

    @Test
    void updatePassword() throws Exception{
        ResetPasswordRequest resetPasswordRequest = new ResetPasswordRequest("token-simulado", "12345");
        RespuestaForgotPassword respuestaForgotPassword = new RespuestaForgotPassword("Contraseña actualizada correctamente");
        BDDMockito.given(usuarioService.updatePassword(resetPasswordRequest)).willReturn(respuestaForgotPassword);

        ResultActions response = mockMvc.perform(
                patch("/auth/update-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetPasswordRequest))
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensage").value("Contraseña actualizada correctamente"));
    }
}