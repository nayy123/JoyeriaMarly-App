package com.Proyecto.Joyeria_Marly.repository;

import com.Proyecto.Joyeria_Marly.entity.ImageHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ImageHeaderRepository extends JpaRepository<ImageHeader, Long> {
    Optional<ImageHeader> findByCollectionName(String collectionName);
}