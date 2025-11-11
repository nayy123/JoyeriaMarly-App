package com.marly.handmade.controller;

import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.service.PedidoService;
import com.marly.handmade.service.ReporteService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PedidosController.class)
@AutoConfigureMockMvc(addFilters = false)
class PedidosControllerTest extends ControllerTestBase {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PedidoService pedidoService;

    @MockBean
    private ReporteService reporteService;

    @Test
    void updatePedido() throws Exception {
        BDDMockito.doNothing().when(pedidoService).updatePedido(1L);

        mockMvc.perform(
                        org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch("/pedido/1")
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void listarPedidos() throws Exception {
        PedidoResponse pedido = new PedidoResponse(1L, new java.util.Date(),
                "Calle Falsa 123", 200.0, null, List.of());
        BDDMockito.given(pedidoService.listarPedidos()).willReturn(List.of(pedido));

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void listarPedidoPorCliente() throws Exception {
        PedidoResponse pedido = new PedidoResponse(1L, new java.util.Date(),
                "Calle Falsa 123", 200.0, null, List.of());
        BDDMockito.given(pedidoService.listarPedidoPorCliente("Juan")).willReturn(List.of(pedido));

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/cliente/nombre/Juan"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void mostrarPedidosPorId() throws Exception {
        PedidoResponse pedido = new PedidoResponse(1L, new java.util.Date(),
                "Calle Falsa 123", 200.0, null, List.of());
        BDDMockito.given(pedidoService.mostrarPedidosPorId(1L)).willReturn(pedido);

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/mostrar/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void listarPedidoPorestado() throws Exception {
        PedidoResponse pedido = new PedidoResponse(1L, new java.util.Date(),
                "Calle Falsa 123", 200.0, null, List.of());
        BDDMockito.given(pedidoService.listarPedidoPorestado(false)).willReturn(List.of(pedido));

        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/pedido/estado/false"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}
