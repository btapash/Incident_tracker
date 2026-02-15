package com.tapash.incident_tracker.service.impl;

import com.tapash.incident_tracker.DTO.IncidentCreateRequest;
import com.tapash.incident_tracker.DTO.IncidentUpdateRequest;
import com.tapash.incident_tracker.entity.Incident;
import com.tapash.incident_tracker.entity.Severity;
import com.tapash.incident_tracker.entity.Status;
import com.tapash.incident_tracker.mapper.IncidentMapper;
import com.tapash.incident_tracker.repository.IncidentRepository;
import com.tapash.incident_tracker.service.IncidentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class IncidentServiceImpl implements IncidentService {

    private final IncidentRepository repo;

    public IncidentServiceImpl(IncidentRepository repo) {
        this.repo = repo;
    }

    @Override
    public Page<Incident> getAll(
            int page, int size,
            String status,
            String service,
            String severity,
            String search,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return repo.findAll((root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // status
            if (status != null && !status.isEmpty()) {
                predicates.add(cb.equal(root.get("status"),
                        Status.valueOf(status)));
            }

            // service
            if (service != null && !service.isEmpty()) {
                predicates.add(cb.equal(root.get("service"), service));
            }

            // severity
            if (severity != null && !severity.isEmpty()) {
                predicates.add(cb.equal(root.get("severity"),
                        Severity.valueOf(severity)));
            }

            // 🔍 search ONLY title
            if (search != null && !search.trim().isEmpty()) {
                predicates.add(cb.like(
                        cb.lower(root.get("title")),
                        "%" + search.toLowerCase() + "%"
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));

        }, pageable);
    }



    public Incident create(IncidentCreateRequest req) {
        validateEnums(req);
        return repo.save(IncidentMapper.toEntity(req));
    }

    public Incident update(Long id, IncidentUpdateRequest req) {
        Incident i = repo.findById(id)
                .orElseThrow(NoSuchElementException::new);

        if (req.status != null) {
            i.setStatus(Status.valueOf(req.status));
        }

        if (req.severity != null) {
            i.setSeverity(Severity.valueOf(req.severity));
        }

        if (req.summary != null) {
            i.setSummary(req.summary);
        }

        if (req.service != null) {
            i.setService(req.service);
        }

        if (req.title != null) {
            i.setTitle(req.title);
        }

        if (req.owner != null) {
            i.setOwner(req.owner);
        }

        return repo.save(i);
    }

    public Incident getById(Long id) {
        return repo.findById(id)
                .orElseThrow(NoSuchElementException::new);
    }

    private void validateEnums(IncidentCreateRequest req) {
        try {
            Severity.valueOf(req.severity);
            Status.valueOf(req.status);
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }
}

