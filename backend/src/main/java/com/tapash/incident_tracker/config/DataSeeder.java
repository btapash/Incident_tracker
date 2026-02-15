package com.tapash.incident_tracker.config;

import com.tapash.incident_tracker.entity.Incident;
import com.tapash.incident_tracker.entity.Severity;
import com.tapash.incident_tracker.entity.Status;
import com.tapash.incident_tracker.repository.IncidentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final IncidentRepository repo;

    public DataSeeder(IncidentRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {

//         prevent duplicate seeding
        if (repo.count() > 0) return;

        for (int i = 1; i <= 200; i++) {

            Incident inc = new Incident();
            inc.setTitle("Incident " + i);
            inc.setService(i % 2 == 0 ? "Payments" : "Auth");
            inc.setSeverity(Severity.values()[i % 4]);
            inc.setStatus(Status.values()[i % 3]);
            inc.setOwner("User " + i);
            inc.setSummary("Auto-generated incident " + i);

            repo.save(inc);
        }

        System.out.println(" Seeded 200 incidents");
    }
}

