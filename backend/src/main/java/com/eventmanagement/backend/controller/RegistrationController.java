package com.eventmanagement.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.service.RegistrationService;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {

        this.registrationService = registrationService;
    }


    // =========================================
    // CREATE REGISTRATION
    // =========================================

    @PostMapping
    public ResponseEntity<?> createRegistration(
            @RequestBody Registration registration) {

        try {

            Registration savedRegistration =
                    registrationService
                            .createRegistration(registration);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedRegistration);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================================
    // GET ALL REGISTRATIONS
    // =========================================

    @GetMapping
    public ResponseEntity<List<Registration>>
            getAllRegistrations() {

        return ResponseEntity.ok(
                registrationService
                        .getAllRegistrations()
        );
    }


    // =========================================
    // GET REGISTRATIONS BY USER EMAIL
    // =========================================

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Registration>>
            getRegistrationsByUser(
                    @PathVariable String email) {

        return ResponseEntity.ok(
                registrationService
                        .getRegistrationsByEmail(email)
        );
    }


    // =========================================
    // GET REGISTRATIONS BY EVENT
    // =========================================

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Registration>>
            getRegistrationsByEvent(
                    @PathVariable Long eventId) {

        return ResponseEntity.ok(
                registrationService
                        .getRegistrationsByEvent(eventId)
        );
    }


    // =========================================
    // GET REGISTRATION BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getRegistrationById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    registrationService
                            .getRegistrationById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================================
    // DELETE REGISTRATION
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRegistration(
            @PathVariable Long id) {

        try {

            registrationService
                    .deleteRegistration(id);

            return ResponseEntity.ok(
                    "Registration deleted successfully."
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}