package com.marly.handmade.controller;

import com.marly.handmade.domain.pedido.data.PedidoRequest;
import com.marly.handmade.domain.pedido.data.PedidoResponse;
import com.marly.handmade.service.PedidoService;
import com.marly.handmade.service.ReporteService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("pedido")
public class PedidosController {

    private PedidoService pedidoService;
    private ReporteService reporteService;

    public PedidosController(PedidoService pedidoService, ReporteService reporteService) {
        this.pedidoService = pedidoService;
        this.reporteService = reporteService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> createPedido(@RequestBody @Valid PedidoRequest request, UriComponentsBuilder builder){
        PedidoResponse pedidoResponse = pedidoService.createPedido(request);
        URI uri = builder.path("/producto/{id}").buildAndExpand(pedidoResponse.id()).toUri();
        return ResponseEntity.created(uri).body(pedidoResponse);
    }

    @PatchMapping("{id}")
    @Transactional
    public ResponseEntity<PedidoResponse> updatePedido(@PathVariable long id){
        pedidoService.updatePedido(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listarPedidos(){
        return ResponseEntity.ok(pedidoService.listarPedidos());
    }

    @GetMapping("/cliente/nombre/{nombre}")
    public ResponseEntity<List<PedidoResponse>> listarPedidoPorCliente(@PathVariable String nombre){
        return ResponseEntity.ok(pedidoService.listarPedidoPorCliente(nombre));
    }

    @GetMapping("mostrar/{id}")
    public ResponseEntity<PedidoResponse> mostrarPedidosPorId(@PathVariable long id){
        return ResponseEntity.ok(pedidoService.mostrarPedidosPorId(id));
    }

    @GetMapping("estado/{estado}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PedidoResponse>> listarPedidoPorestado(@PathVariable boolean estado){
        return ResponseEntity.ok(pedidoService.listarPedidoPorestado(estado));
    }

    @GetMapping("excel")
    @PreAuthorize("hasRole('ADMIN')")
    public void generarExcelReporte(HttpServletResponse response) throws IOException {
        reporteService.generateExcel(response);
    }
}
