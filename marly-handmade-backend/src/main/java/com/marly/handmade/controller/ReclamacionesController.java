package com.marly.handmade.controller;

import com.marly.handmade.domain.reclamaciones.data.ReclamacionesRequest;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.marly.handmade.service.ReclamacionesService;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("reclamaciones")
public class ReclamacionesController {

    private ReclamacionesService reclamacionesService;
    
    public ReclamacionesController(ReclamacionesService reclamacionesService){
        this.reclamacionesService = reclamacionesService;
    }

    @PostMapping
    public ResponseEntity<ReclamacionesResponse> crearReclamacion(@RequestBody @Valid ReclamacionesRequest reclamacionesRequest, UriComponentsBuilder builder){
        ReclamacionesResponse reclamacionesResponse = reclamacionesService.crearReclamacion(reclamacionesRequest);
        URI uri = builder.path("/reclamaciones/{id}").buildAndExpand(reclamacionesResponse.id()).toUri();
        return ResponseEntity.created(uri).body(reclamacionesResponse);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReclamacionesResponse>> listarReclamaciones (){
        return ResponseEntity.ok(reclamacionesService.listarReclamaciones());
    }

    @GetMapping("{nombre}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReclamacionesResponse>> mostrarPorNombre(@PathVariable String nombre){
        return ResponseEntity.ok(reclamacionesService.mostrarPorNombre(nombre));
    }

    @GetMapping("mostrar/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReclamacionesResponse> mostrarPorId(@PathVariable long id){
        return ResponseEntity.ok(reclamacionesService.mostrarPorId(id));
    }
}
