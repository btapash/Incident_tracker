package com.tapash.incident_tracker.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class IncidentResponse {

    public Long id;
    public String title;
    public String service;
    public String severity;
    public String status;
    public String owner;
    public String summary;
    public LocalDateTime createdAt;
}
