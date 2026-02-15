package com.tapash.incident_tracker.specification;


import com.tapash.incident_tracker.entity.Incident;
import com.tapash.incident_tracker.entity.Status;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;


public class IncidentSpecification {

    public static Specification<Incident> build(
            String search, String status, String service) {

        return (root, query, cb) -> {
            List<Predicate> p = new ArrayList<>();

            if (search != null && !search.isEmpty()) {
                p.add(cb.like(cb.lower(root.get("title")),
                        "%" + search.toLowerCase() + "%"));
            }

            if (status != null && !status.isEmpty()) {
                p.add(cb.equal(root.get("status"),
                        Status.valueOf(status)));
            }

            if (service != null && !service.isEmpty()) {
                p.add(cb.equal(root.get("service"), service));
            }

            return cb.and(p.toArray(new Predicate[0]));
        };
    }
}
