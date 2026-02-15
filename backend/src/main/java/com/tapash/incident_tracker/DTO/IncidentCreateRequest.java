package com.tapash.incident_tracker.DTO;

import jakarta.validation.constraints.*;

public class IncidentCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255)
    public String title;

    @NotBlank(message = "Service is required")
    public String service;

    @NotBlank(message = "Severity is required")
    public String severity;

    @NotBlank(message = "Status is required")
    public String status;

    @Size(max = 100)
    public String owner;

    @Size(max = 1000)
    public String summary;
}
