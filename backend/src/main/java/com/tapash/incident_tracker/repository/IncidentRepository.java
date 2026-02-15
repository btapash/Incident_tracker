package com.tapash.incident_tracker.repository;

import com.tapash.incident_tracker.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IncidentRepository extends
        JpaRepository<Incident, Long>,
        JpaSpecificationExecutor<Incident> {
}
