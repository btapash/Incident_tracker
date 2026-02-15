package com.tapash.incident_tracker.entity;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Table(name = "incidents",
        indexes = {
                @Index(name = "idx_status", columnList = "status"),
                @Index(name = "idx_service", columnList = "service"),
                @Index(name = "idx_created_at", columnList = "createdAt")
        })
@Data
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String service;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String owner;

    @Column(length = 1000)
    private String summary;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getters & setters
}
