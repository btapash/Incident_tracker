package com.tapash.incident_tracker.service.impl;

import com.tapash.incident_tracker.DTO.IncidentCreateRequest;
import com.tapash.incident_tracker.DTO.IncidentUpdateRequest;
import com.tapash.incident_tracker.entity.Incident;
import com.tapash.incident_tracker.entity.Severity;
import com.tapash.incident_tracker.entity.Status;
import com.tapash.incident_tracker.mapper.IncidentMapper;
import com.tapash.incident_tracker.repository.IncidentRepository;
import com.tapash.incident_tracker.service.IncidentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
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
        log.debug("Fetching incidents with filters: page={}, size={}, status={}, service={}, severity={}, search={}, sortBy={}, direction={}",
                page, size, status, service, severity, search, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Incident> result  = repo.findAll((root, query, cb) -> {

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

        log.info("Fetched {} incidents (page {} of {})",
                result.getNumberOfElements(),
                result.getNumber() + 1,
                result.getTotalPages());

        return result;
    }



    public Incident create(IncidentCreateRequest req) {
        validateEnums(req);
        log.info("Creating incident: title={}, service={}, severity={}, status={}",
                req.title, req.service, req.severity, req.status);

        validateEnums(req);

        Incident saved = repo.save(IncidentMapper.toEntity(req));

        log.info("Incident created successfully with id={}", saved.getId());

        return saved;
    }

    public Incident update(Long id, IncidentUpdateRequest req) {
        log.info("Updating incident id={}", id);

        Incident i = repo.findById(id)
                .orElseThrow(() -> {
                    log.error("Incident not found with id={}", id);
                    return new NoSuchElementException("Incident not found");
                });

        if (req.status != null) {
            log.debug("Updating status to {}", req.status);
            i.setStatus(Status.valueOf(req.status));
        }

        if (req.severity != null) {
            log.debug("Updating severity to {}", req.severity);
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

        Incident updated = repo.save(i);

        log.info("Incident updated successfully id={}", id);

        return updated;
    }

    public Incident getById(Long id) {
        log.info("Fetching incident by id={}", id);

        return repo.findById(id)
                .orElseThrow(() -> {
                    log.error("Incident not found with id={}", id);
                    return new NoSuchElementException("Incident not found");
                });
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

