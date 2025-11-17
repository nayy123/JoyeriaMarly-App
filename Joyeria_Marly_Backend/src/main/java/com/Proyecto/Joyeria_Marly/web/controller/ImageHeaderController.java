package com.Proyecto.Joyeria_Marly.web.controller;

import com.Proyecto.Joyeria_Marly.entity.ImageHeader;
import com.Proyecto.Joyeria_Marly.repository.ImageHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageHeaderController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;
    
    @Autowired
    private ImageHeaderRepository imageHeaderRepository;

    // Obtener imagen del header por nombre de colección
    @GetMapping("/{collectionName}-header-image")
    public ResponseEntity<?> getHeaderImage(@PathVariable String collectionName) {
        try {
            Optional<ImageHeader> imageHeader = imageHeaderRepository.findByCollectionName(collectionName);
            
            Map<String, String> response = new HashMap<>();
            if (imageHeader.isPresent()) {
                String imageUrl = imageHeader.get().getImageUrl();
                // Si la URL ya es completa, devolverla tal cual
                if (imageUrl.startsWith("http")) {
                    response.put("imageUrl", imageUrl);
                } else {
                    response.put("imageUrl", "http://localhost:8080/uploads/" + 
                        imageUrl.substring(imageUrl.lastIndexOf("/") + 1));
                }
            } else {
                response.put("imageUrl", "");
            }
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al cargar la imagen: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    // Subir/actualizar imagen del header
    @PostMapping("/upload-{collectionName}-header-image")
    public ResponseEntity<?> uploadHeaderImage(
            @PathVariable String collectionName,
            @RequestParam("headerImage") MultipartFile file) {
        
        try {
            // Validar archivo
            if (file.isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Por favor selecciona una imagen");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Crear directorio si no existe
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generar nombre único para el archivo
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + fileExtension;
            Path filePath = uploadPath.resolve(fileName);
            
            // Guardar archivo
            Files.copy(file.getInputStream(), filePath);
            
            // Ruta para la base de datos
            String imageUrl = uploadDir + "/" + fileName;
            
            // Buscar si ya existe una imagen para esta colección
            Optional<ImageHeader> existingImage = imageHeaderRepository.findByCollectionName(collectionName);
            
            ImageHeader imageHeader;
            if (existingImage.isPresent()) {
                // Actualizar existente
                imageHeader = existingImage.get();
                // Eliminar archivo anterior
                try {
                    Files.deleteIfExists(Paths.get(imageHeader.getImageUrl()));
                } catch (IOException e) {
                    System.out.println("No se pudo eliminar el archivo anterior: " + e.getMessage());
                }
                imageHeader.setImageUrl(imageUrl);
                imageHeader.setOriginalFileName(originalFileName);
            } else {
                // Crear nuevo
                imageHeader = new ImageHeader(collectionName, imageUrl, originalFileName);
            }
            
            imageHeaderRepository.save(imageHeader);
            
            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", "http://localhost:8080/uploads/" + fileName);
            response.put("message", "Imagen subida exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al subir la imagen: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}