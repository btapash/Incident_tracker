package com.tapash.incident_tracker.service;

import com.tapash.incident_tracker.DTO.IncidentCreateRequest;
import com.tapash.incident_tracker.DTO.IncidentUpdateRequest;
import com.tapash.incident_tracker.entity.Incident;
import org.springframework.data.domain.Page;

public interface IncidentService {

    Page<Incident> getAll(
            int page, int size,
            String status, String service, String severity, String search,
            String sortBy,
            String direction
    );

    Incident create(IncidentCreateRequest req);

    Incident update(Long id, IncidentUpdateRequest req);

    Incident getById(Long id);
}
