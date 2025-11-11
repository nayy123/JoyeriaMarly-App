package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.pedido.modal.Pedido;
import com.marly.handmade.domain.pedido.repository.PedidoRepository;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ReporteServiceTest {

    private PedidoRepository pedidoRepository;
    private ReporteService reporteService;

    @BeforeEach
    void setup() {
        pedidoRepository = Mockito.mock(PedidoRepository.class);
        reporteService = new ReporteService(pedidoRepository);
    }

    @Test
    void generateExcel_emptyList_writesHeader() throws IOException {
        BDDMockito.given(pedidoRepository.findAll()).willReturn(List.of());

        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ServletOutputStream sos = new ServletOutputStream() {
            @Override
            public void write(int b) throws IOException {
                baos.write(b);
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setWriteListener(jakarta.servlet.WriteListener writeListener) {
                // no-op for testing
            }
        };
        BDDMockito.given(response.getOutputStream()).willReturn(sos);

        reporteService.generateExcel(response);

        // some bytes should have been written to the output
        assertThat(baos.size()).isGreaterThan(0);
        BDDMockito.verify(response).setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        BDDMockito.verify(response).setHeader(Mockito.eq("Content-Disposition"), Mockito.contains("pedidos.xlsx"));
    }

    @Test
    void generateExcel_withPedidos_writesRows() throws IOException {
        Cliente cliente = Cliente.builder().id(1L).nombres("Juan").build();
        Pedido pedido = Pedido.builder().idPedido(1L).fechaPedido(new Date()).estado(true).direccionEnvio("Calle").total(123.0).cliente(cliente).build();
        BDDMockito.given(pedidoRepository.findAll()).willReturn(List.of(pedido));

        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ServletOutputStream sos = new ServletOutputStream() {
            @Override
            public void write(int b) throws IOException {
                baos.write(b);
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setWriteListener(jakarta.servlet.WriteListener writeListener) {
                // no-op for testing
            }
        };
        BDDMockito.given(response.getOutputStream()).willReturn(sos);

        reporteService.generateExcel(response);

        assertThat(baos.size()).isGreaterThan(0);
        BDDMockito.verify(response).setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

}
