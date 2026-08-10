package com.applicationtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.applicationtracker.domain.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}