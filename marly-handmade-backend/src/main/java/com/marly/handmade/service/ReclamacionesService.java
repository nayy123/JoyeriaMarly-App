package com.marly.handmade.service;

import com.marly.handmade.domain.cliente.modal.Cliente;
import com.marly.handmade.domain.cliente.repository.ClienteRepository;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesRequest;
import com.marly.handmade.domain.reclamaciones.data.ReclamacionesResponse;
import com.marly.handmade.domain.reclamaciones.modal.Reclamaciones;
import com.marly.handmade.domain.reclamaciones.repository.ReclamacionesRepository;
import com.marly.handmade.domain.usuario.modal.Usuario;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.marly.handmade.util.ApacheCommonsUtils;

import java.util.Date;
import java.util.List;

@Service
public class ReclamacionesService {
    private ReclamacionesRepository reclamacionesRepository;

    private ClienteRepository clienteRepository;

    public ReclamacionesService(ReclamacionesRepository reclamacionesRepository, ClienteRepository clienteRepository) {
        this.reclamacionesRepository = reclamacionesRepository;
        this.clienteRepository = clienteRepository;
    }

    private Cliente obtenerCliente(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        Cliente cliente = clienteRepository.findByUsuario_Id(usuario.getId());
        ApacheCommonsUtils.requireNonNullRuntime(cliente, "No existe el cliente con ese id");
        return cliente;
    }


    public ReclamacionesResponse crearReclamacion(ReclamacionesRequest reclamacionesRequest){
        Cliente cliente = obtenerCliente();
        Date fechaReclamo = new Date();
        Reclamaciones reclamaciones = Reclamaciones.builder()
                .descripcion(reclamacionesRequest.descripcion())
                .fechaReclamo(fechaReclamo)
                .cliente(cliente)
                .build();

        reclamacionesRepository.save(reclamaciones);
        return new ReclamacionesResponse(reclamaciones, cliente.getNombres());
    }

    public List<ReclamacionesResponse> listarReclamaciones(){
        return reclamacionesRepository.findAll().stream().map(r -> new ReclamacionesResponse(r,r.getCliente().getNombres()
                + " " + r.getCliente().getApellidos())).toList();
    }

    public List<ReclamacionesResponse> mostrarPorNombre(String nombre) {
    List<Reclamaciones> reclamaciones = reclamacionesRepository.findByCliente_Nombres(nombre);
    ApacheCommonsUtils.requireNonNullRuntime(reclamaciones, "No se encontraron reclamos para el cliente: " + nombre);
        return reclamaciones.stream().map(r -> new ReclamacionesResponse(
                        r.getIdReclamo(),
                        r.getDescripcion(),
                        r.getFechaReclamo(),
                        r.getCliente().getNombres()
                ))
                .toList();
    }

    public ReclamacionesResponse mostrarPorId(long id){
       Reclamaciones reclamaciones = reclamacionesRepository.findById(id).orElseThrow(() -> new RuntimeException("El reclamo con ese id no existe"));
        String clienteNombre = reclamaciones.getCliente().getNombres();
        return new ReclamacionesResponse(reclamaciones, clienteNombre);
    }

}
