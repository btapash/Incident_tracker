package com.tapash.incident_tracker.DTO;

import lombok.Data;

@Data
public class IncidentUpdateRequest {

    public String owner;
    public String title;
    public String service;
    public String severity;
    public String status;
    public String summary;
}
