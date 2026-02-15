package com.tapash.incident_tracker.controller;

import com.tapash.incident_tracker.DTO.IncidentCreateRequest;
import com.tapash.incident_tracker.DTO.IncidentResponse;
import com.tapash.incident_tracker.DTO.IncidentUpdateRequest;
import com.tapash.incident_tracker.mapper.IncidentMapper;
import com.tapash.incident_tracker.service.IncidentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService service;

    public IncidentController(IncidentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<IncidentResponse> create(
            @Valid @RequestBody IncidentCreateRequest req) {

        return ResponseEntity.status(201)
                .body(IncidentMapper.toResponse(service.create(req)));
    }

    @GetMapping
    public ResponseEntity<Page<IncidentResponse>> getAll(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String serviceName,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        Page<IncidentResponse> res = service.getAll(
                page, size, status, serviceName, severity, search, sortBy, direction
        ).map(IncidentMapper::toResponse);

        return ResponseEntity.ok(res);
    }


    @GetMapping("/{id}")
    public ResponseEntity<IncidentResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
                IncidentMapper.toResponse(service.getById(id))
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IncidentResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody IncidentUpdateRequest req) {

        return ResponseEntity.ok(
                IncidentMapper.toResponse(service.update(id, req))
        );
    }
}
