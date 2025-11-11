package com.marly.handmade.infrastructure.security;

import com.marly.handmade.domain.usuario.repository.UsuarioRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.mockito.ArgumentMatchers.anyString;

@ExtendWith(MockitoExtension.class)
class SecurityFilterTest {

    @Mock
    private TokenService tokenService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Test
    void whenTokenInvalid_tokenServiceThrows_thenExceptionPropagates() throws Exception {
        SecurityFilter filter = new SecurityFilter(tokenService, usuarioRepository);

        MockHttpServletRequest req = new MockHttpServletRequest();
        req.addHeader("Authorization", "Bearer bad-token");
        MockHttpServletResponse resp = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        Mockito.when(tokenService.getSubject(anyString())).thenThrow(new RuntimeException("Token inválido"));

        Assertions.assertThrows(RuntimeException.class, () -> filter.doFilterInternal(req, resp, chain));
    }

}