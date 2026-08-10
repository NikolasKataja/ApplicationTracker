package com.applicationtracker;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.applicationtracker.repository.ApplicationRepository;
import com.applicationtracker.domain.Application;

@SpringBootApplication
public class ApplicationtrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationtrackerApplication.class, args);
	}
}
