package com.marly.handmade.domain.reclamaciones.repository;

import com.marly.handmade.domain.reclamaciones.modal.Reclamaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamacionesRepository extends JpaRepository <Reclamaciones, Long> {

    List<Reclamaciones> findByCliente_Nombres(String nombre);
}
