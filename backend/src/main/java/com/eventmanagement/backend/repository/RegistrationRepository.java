package com.eventmanagement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventmanagement.backend.entity.Registration;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    List<Registration> findByEventId(Long eventId);

    List<Registration> findByEmail(String email);

    // Check whether the same email is already registered
    // for the same event
    boolean existsByEmailAndEventId(String email, Long eventId);
}