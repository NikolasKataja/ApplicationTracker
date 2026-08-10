package com.applicationtracker.domain;
import java.time.LocalDate;
import jakarta.persistence.Lob;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String position;
    private String location;

    @Lob
    private String notes;
    private String jobUrl;
    private LocalDate applicationDate;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.APPLIED; // Default status when a new application is created

    public Application() {
    }

    public Application(String company, String position, String location) {
        this.company = company;
        this.position = position;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getJobUrl() {
        return jobUrl;
    }
    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }
    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public ApplicationStatus getStatus() {
        return status;
    }
    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}