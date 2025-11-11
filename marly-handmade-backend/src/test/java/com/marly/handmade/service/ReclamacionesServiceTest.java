package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesRequest;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesResponse;
import com.marly.handmade.domain.reclamaciones.modal.Reclamaciones;
import com.marly.handmade.domain.reclamaciones.repository.ReclamacionesRepository;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ReclamacionesServiceTest {

    private ReclamacionesRepository reclamacionesRepository;
    private ClienteRepository clienteRepository;
    private ReclamacionesService reclamacionesService;

    @BeforeEach
    void setup() {
        reclamacionesRepository = Mockito.mock(ReclamacionesRepository.class);
        clienteRepository = Mockito.mock(ClienteRepository.class);
        reclamacionesService = new ReclamacionesService(reclamacionesRepository, clienteRepository);
    }

    private void mockSecurityContextWithUsuario(Usuario usuario) {
        Authentication auth = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
        SecurityContext ctx = Mockito.mock(SecurityContext.class);
        BDDMockito.given(ctx.getAuthentication()).willReturn(auth);
        SecurityContextHolder.setContext(ctx);
    }

    @Test
    void crearReclamacion_happyPath() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        Cliente cliente = Cliente.builder().id(2L).nombres("Juan").apellidos("Perez").usuario(usuario).build();

        mockSecurityContextWithUsuario(usuario);

        ReclamacionesRequest request = new ReclamacionesRequest("Producto defectuoso");

        BDDMockito.given(clienteRepository.findByUsuario_Id(1L)).willReturn(cliente);

        Reclamaciones saved = Reclamaciones.builder().idReclamo(1L).descripcion(request.descripcion()).fechaReclamo(new Date()).cliente(cliente).build();
        BDDMockito.given(reclamacionesRepository.save(Mockito.any(Reclamaciones.class))).willReturn(saved);

        ReclamacionesResponse resp = reclamacionesService.crearReclamacion(request);

        assertThat(resp.descripcion()).isEqualTo("Producto defectuoso");
        assertThat(resp.clienteNombre()).isEqualTo("Juan");
    }

    @Test
    void listarYMostrarPorNombre() {
        Cliente cliente = Cliente.builder().id(2L).nombres("Juan").apellidos("Perez").build();
        Reclamaciones r = Reclamaciones.builder().idReclamo(1L).descripcion("D").fechaReclamo(new Date()).cliente(cliente).build();
        BDDMockito.given(reclamacionesRepository.findAll()).willReturn(List.of(r));
        BDDMockito.given(reclamacionesRepository.findByCliente_Nombres("Juan")).willReturn(List.of(r));

        List<ReclamacionesResponse> all = reclamacionesService.listarReclamaciones();
        assertThat(all).hasSize(1);

        List<ReclamacionesResponse> byName = reclamacionesService.mostrarPorNombre("Juan");
        assertThat(byName).hasSize(1);
        assertThat(byName.get(0).clienteNombre()).isEqualTo("Juan");
    }

}
