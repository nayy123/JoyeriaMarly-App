package com.marly.handmade.domain.cliente.repository;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClienteRepositoryTest {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuario;

    @BeforeEach
    void setup() throws ParseException {
        Date fechaNacimiento = new SimpleDateFormat("dd-MM-yyyy").parse("10-09-1980");

        usuario = Usuario.builder()
                .username("Boris")
                .password("123")
                .rol(Rol.CLIENTE)
                .estado(false)
                .build();
        usuarioRepository.save(usuario);

        Cliente cliente = Cliente.builder()
                .nombres("Boris")
                .apellidos("Fernandez")
                .direccion("direccion")
                .fechaNacimiento(fechaNacimiento)
                .identificacion("12345")
                .puntosFidelizacion(0)
                .correo("borisfernandez@gmail.com")
                .telefono("98812412")
                .usuario(usuario)
                .build();

        clienteRepository.save(cliente);
    }

    @DisplayName("Verifica que existe un correo")
    @Test
    void existsByCorreo(){

        boolean existe = clienteRepository.existsByCorreo("borisfernandez@gmail.com");

        assertThat(existe).isTrue();
    }

    @DisplayName("Verifica que no existe un correo")
    @Test
    void notExistsByCorreo() {
        boolean existe = clienteRepository.existsByCorreo("borisfernandezsss@gmail.com");

        assertThat(existe).isFalse();
    }

    @DisplayName("Verifica que existe un id por el correo")
    @Test
    void idClientefindByCorreo() {
        Long id = clienteRepository.idClientefindByCorreo("borisfernandez@gmail.com");

        assertThat(id).isNotNull();
        assertThat(id).isPositive();
    }

    @DisplayName("Verificar que existe un cliente por el correo")
    @Test
    void findByCorreo() {
        Cliente cliente = clienteRepository.findByCorreo("borisfernandez@gmail.com");

        assertThat(cliente.getDireccion()).isEqualTo("direccion");
        assertThat(cliente).isNotNull();
    }

    @DisplayName("Verificar que existe un cliente por id del usuario")
    @Test
    void findByUsuario_Id() {
        Cliente cliente = clienteRepository.findByUsuario_Id(usuario.getId());

        assertThat(cliente).isNotNull();
        assertThat(cliente.getNombres()).isEqualTo("Boris");
        assertThat(cliente.getUsuario()).isEqualTo(usuario);
    }
}