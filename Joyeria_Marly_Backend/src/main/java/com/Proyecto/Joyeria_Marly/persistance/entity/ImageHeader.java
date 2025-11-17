package com.Proyecto.Joyeria_Marly.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "header_images")
public class ImageHeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String collectionName; // "sea-collection", "matarita-collection", "best-sellers"
    
    @Column(nullable = false)
    private String imageUrl;
    
    private String originalFileName;
    
    // Constructores
    public ImageHeader() {}
    
    public ImageHeader(String collectionName, String imageUrl, String originalFileName) {
        this.collectionName = collectionName;
        this.imageUrl = imageUrl;
        this.originalFileName = originalFileName;
    }
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getOriginalFileName() { return originalFileName; }
    public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }
}