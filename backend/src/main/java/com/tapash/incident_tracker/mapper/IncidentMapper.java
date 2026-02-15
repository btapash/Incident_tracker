package com.tapash.incident_tracker.mapper;

import com.tapash.incident_tracker.DTO.IncidentCreateRequest;
import com.tapash.incident_tracker.DTO.IncidentResponse;
import com.tapash.incident_tracker.entity.Incident;
import com.tapash.incident_tracker.entity.Severity;
import com.tapash.incident_tracker.entity.Status;

public class IncidentMapper {

    public static Incident toEntity(IncidentCreateRequest req) {
        Incident i = new Incident();
        i.setTitle(req.title);
        i.setService(req.service);
        i.setSeverity(Severity.valueOf(req.severity));
        i.setStatus(Status.valueOf(req.status));
        i.setOwner(req.owner);
        i.setSummary(req.summary);
        return i;
    }

    public static IncidentResponse toResponse(Incident i) {
        IncidentResponse r = new IncidentResponse();
        r.id = i.getId();
        r.title = i.getTitle();
        r.service = i.getService();
        r.severity = i.getSeverity().name();
        r.status = i.getStatus().name();
        r.owner = i.getOwner();
        r.summary = i.getSummary();
        r.createdAt = i.getCreatedAt();
        return r;
    }
}

