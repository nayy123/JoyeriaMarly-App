package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.producto.data.ProductoRequest;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.producto.data.ProductoUpdate;
import com.marly.handmade.service.ProductoService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductoController.class)
@AutoConfigureMockMvc()
class ProductoControllerTest extends ControllerTestBase{

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductoService productoService;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void crearProducto() throws Exception {
        ProductoRequest productoRequest = new ProductoRequest("joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA");
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA");
        BDDMockito.given(productoService.crearProducto(productoRequest)).willReturn(productoResponse);

        ResultActions response = mockMvc.perform(
                post("/producto")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productoRequest)));

        response.andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/producto/1")))
                .andExpect(jsonPath("$.nombre").value("joya"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"Cliente"})
    void crearProducto_sinRolAdmin_retornaForbidden() throws Exception {
        ProductoRequest productoRequest = new ProductoRequest("joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA");

        ResultActions response = mockMvc.perform(
                        post("/producto")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(productoRequest)));
        response.andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "user", roles = {"Cliente"})
    void listarProductos() throws Exception {
        List<ProductoResponse> productosResponses = Arrays.asList(new ProductoResponse(1L, "joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA"));
        BDDMockito.given(productoService.listarProductos()).willReturn(productosResponses);

        ResultActions response = mockMvc.perform(
                get("/producto/all")
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    @WithMockUser(username = "user", roles = {"Cliente"})
    void buscarPorId() throws Exception {
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA");
        BDDMockito.given(productoService.buscar(null, 1L)).willReturn(productoResponse);

        ResultActions response = mockMvc.perform(
                get("/producto?id=1")
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("joya"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"Cliente"})
    void buscarPorNombre() throws Exception {
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "foto1", "foto2", "foto3", "categoriaA");
        BDDMockito.given(productoService.buscar("joya", null)).willReturn(productoResponse);

        ResultActions response = mockMvc.perform(
                get("/producto?nombre=joya")
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("joya"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void update() throws Exception {
        ProductoUpdate productoUpdate = new ProductoUpdate("", 30.0, 0, "", "", "", "");
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 30.0, 1, "foto1", "foto2", "foto3", "categoriaA");
        BDDMockito.given(productoService.update(1L, productoUpdate)).willReturn(productoResponse);

        ResultActions response = mockMvc.perform(
                patch("/producto/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productoUpdate))
        );

        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.precio").value("30.0"));
    }
}