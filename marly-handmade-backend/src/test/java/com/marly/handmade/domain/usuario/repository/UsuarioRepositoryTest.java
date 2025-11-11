package com.marly.handmade.domain.usuario.repository;

import com.marly.handmade.domain.usuario.modal.Rol;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest()
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuario;

    @BeforeEach
    void setup(){
        usuario = Usuario.builder()
                .username("Boris")
                .password("1234")
                .rol(Rol.ADMIN)
                .estado(true)
                .build();
    }

    @DisplayName("Test para guardar un usuario con rol administrador")
    @Test
    void save(){
        Usuario usuario1 = Usuario.builder()
                .username("Marco")
                .password("1234")
                .rol(Rol.ADMIN)
                .estado(true)
                .build();

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        assertThat(usuarioGuardado).isNotNull();
        assertThat(usuarioGuardado.getRol()).isEqualTo(Rol.ADMIN);
    }

    @Test
    void findByUsername() {
        usuarioRepository.save(usuario);

        Usuario usuarioBuscado = usuarioRepository.findByUsername("Boris");

        assertThat(usuarioBuscado).isNotNull();
        assertThat(usuarioBuscado.getUsername()).isEqualToIgnoringCase("boris");
    }

    @Test
    void existsByUsername() {
        usuarioRepository.save(usuario);

        Boolean usuarioBuscado = usuarioRepository.existsByUsername("Leonardo");

        assertThat(usuarioBuscado).isFalse();

    }
}