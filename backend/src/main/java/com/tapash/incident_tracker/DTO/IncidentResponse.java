package com.tapash.incident_tracker.DTO;

import java.time.LocalDateTime;

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
