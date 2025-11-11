package com.marly.handmade.controller;

import java.net.URI;
import java.util.List;

import com.marly.handmade.domain.promociones.data.PromocionesUpdate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.service.PromocionesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("promociones")
public class PromocionesController {

    private PromocionesService promocionesService;

    public PromocionesController(PromocionesService promocionesService) {
        this.promocionesService = promocionesService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PromocionesResponse> crearPromociones (@RequestBody @Valid PromocionesRequest promocionesRequest,UriComponentsBuilder builder){
        PromocionesResponse promocionesResponse = promocionesService.crearPromociones(promocionesRequest);
        URI uri = builder.path("/promociones/{id}").buildAndExpand(promocionesResponse.id()).toUri();
        return ResponseEntity.created(uri).body(promocionesResponse);
    }

    @PatchMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PromocionesResponse> update(@PathVariable long id, @RequestBody PromocionesUpdate promocionesUpdate){
        PromocionesResponse response = promocionesService.update(id, promocionesUpdate);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PromocionesResponse>> listarPromociones (){
        return ResponseEntity.ok(promocionesService.listarPromociones());
    }

    @GetMapping("{nombre}")
    public ResponseEntity<PromocionesResponse> mostrarPorNombre(@PathVariable String nombre){
        return ResponseEntity.ok(promocionesService.mostrarPorNombre(nombre));
    }


    @GetMapping("mostrar/{id}")
    public ResponseEntity<PromocionesResponse> mostrarPorId(@PathVariable long id){
        return ResponseEntity.ok(promocionesService.mostrarPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarPromocionPorId(@PathVariable long id) {
        promocionesService.eliminarPromocionPorId(id);
        return ResponseEntity.noContent().build();
    }

}
