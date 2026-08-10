package com.applicationtracker.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.applicationtracker.domain.Application;
import com.applicationtracker.repository.ApplicationRepository;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository repository;

    public ApplicationController(ApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Application> getApplications() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Application addApplication(@RequestBody Application application) {
        return repository.save(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
        @PathVariable Long id,
        @RequestBody Application updatedApplication) {

            return repository.findById(id)
                .map(application -> {
                    application.setCompany(updatedApplication.getCompany());
                    application.setPosition(updatedApplication.getPosition());
                    application.setLocation(updatedApplication.getLocation());
                    application.setNotes(updatedApplication.getNotes());
                    application.setJobUrl(updatedApplication.getJobUrl());
                    application.setApplicationDate(updatedApplication.getApplicationDate());
                    application.setStatus(updatedApplication.getStatus());

                    Application savedApplication = repository.save(application);
                    return ResponseEntity.ok(savedApplication);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}