package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.producto.data.ProductoResponse;
import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.domain.promociones.data.PromocionesUpdate;
import com.marly.handmade.service.PromocionesService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PromocionesController.class)
@AutoConfigureMockMvc(addFilters = false)
class PromocionesControllerTest extends ControllerTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PromocionesService promocionesService;

    @Test
    void crearPromociones() throws Exception {
        PromocionesRequest request = new PromocionesRequest("PromoA", "Desc", LocalDate.now(), LocalDate.now().plusDays(5), 10.0f, 1L);
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "f1", "f2", "f3", "cat");
        PromocionesResponse responseStub = new PromocionesResponse(1L, "PromoA", "Desc", LocalDate.now(), LocalDate.now().plusDays(5), 10.0f, productoResponse);

        BDDMockito.given(promocionesService.crearPromociones(request)).willReturn(responseStub);

        ResultActions result = mockMvc.perform(
                post("/promociones")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        );

        result.andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/promociones/1")))
                .andExpect(jsonPath("$.nombre").value("PromoA"));
    }

    @Test
    void listarPromociones() throws Exception {
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "f1", "f2", "f3", "cat");
        PromocionesResponse responseStub = new PromocionesResponse(1L, "PromoA", "Desc", LocalDate.now(), LocalDate.now().plusDays(5), 10.0f, productoResponse);
        BDDMockito.given(promocionesService.listarPromociones()).willReturn(List.of(responseStub));

        ResultActions result = mockMvc.perform(get("/promociones"));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void mostrarPorNombre() throws Exception {
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "f1", "f2", "f3", "cat");
        PromocionesResponse responseStub = new PromocionesResponse(1L, "PromoA", "Desc", LocalDate.now(), LocalDate.now().plusDays(5), 10.0f, productoResponse);
        BDDMockito.given(promocionesService.mostrarPorNombre("joya")).willReturn(responseStub);

        ResultActions result = mockMvc.perform(get("/promociones/joya"));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("PromoA"));
    }

    @Test
    void update() throws Exception {
        PromocionesUpdate update = new PromocionesUpdate("PromoB", "Desc2", LocalDate.now(), LocalDate.now().plusDays(3), 5.0f, 1L);
        ProductoResponse productoResponse = new ProductoResponse(1L, "joya", 20.0, 1, "f1", "f2", "f3", "cat");
        PromocionesResponse responseStub = new PromocionesResponse(1L, "PromoB", "Desc2", LocalDate.now(), LocalDate.now().plusDays(3), 5.0f, productoResponse);
        BDDMockito.given(promocionesService.update(1L, update)).willReturn(responseStub);

        ResultActions result = mockMvc.perform(
                patch("/promociones/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update))
        );

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("PromoB"));
    }

    @Test
    void eliminarPromocionPorId() throws Exception {
        ResultActions result = mockMvc.perform(delete("/promociones/1"));

        result.andDo(print())
                .andExpect(status().isNoContent());
    }

}
