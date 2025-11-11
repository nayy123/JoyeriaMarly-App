package com.marly.handmade.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesRequest;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesResponse;
import com.marly.handmade.service.ReclamacionesService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReclamacionesController.class)
@AutoConfigureMockMvc(addFilters = false)
class ReclamacionesControllerTest extends ControllerTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ReclamacionesService reclamacionesService;

    @Test
    void crearReclamacion() throws Exception {
        ReclamacionesRequest request = new ReclamacionesRequest("Producto defectuoso");
        ReclamacionesResponse responseStub = new ReclamacionesResponse(1L, "Producto defectuoso", new Date(), "Juan Perez");

        BDDMockito.given(reclamacionesService.crearReclamacion(request)).willReturn(responseStub);

        ResultActions result = mockMvc.perform(
                post("/reclamaciones")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        );

        result.andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/reclamaciones/1")))
                .andExpect(jsonPath("$.descripcion").value("Producto defectuoso"));
    }

    @Test
    void listarReclamaciones() throws Exception {
        ReclamacionesResponse responseStub = new ReclamacionesResponse(1L, "Producto defectuoso", new Date(), "Juan Perez");
        BDDMockito.given(reclamacionesService.listarReclamaciones()).willReturn(List.of(responseStub));

        ResultActions result = mockMvc.perform(get("/reclamaciones"));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void mostrarPorNombre() throws Exception {
        ReclamacionesResponse responseStub = new ReclamacionesResponse(1L, "Producto defectuoso", new Date(), "Juan Perez");
        BDDMockito.given(reclamacionesService.mostrarPorNombre("Juan")).willReturn(List.of(responseStub));

        ResultActions result = mockMvc.perform(get("/reclamaciones/Juan"));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void mostrarPorId() throws Exception {
        ReclamacionesResponse responseStub = new ReclamacionesResponse(1L, "Producto defectuoso", new Date(), "Juan Perez");
        BDDMockito.given(reclamacionesService.mostrarPorId(1L)).willReturn(responseStub);

        ResultActions result = mockMvc.perform(get("/reclamaciones/mostrar/1"));

        result.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

}
