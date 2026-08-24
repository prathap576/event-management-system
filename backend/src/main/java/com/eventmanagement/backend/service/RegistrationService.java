package com.eventmanagement.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.entity.Registration;
import com.eventmanagement.backend.repository.EventRepository;
import com.eventmanagement.backend.repository.RegistrationRepository;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            EventRepository eventRepository) {

        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }

    // =========================================
    // CREATE REGISTRATION
    // =========================================

    public Registration createRegistration(
            Registration registration) {

        // Check whether event exists
        Event event = eventRepository
                .findById(registration.getEventId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found with id: "
                                        + registration.getEventId()
                        )
                );

        // =========================================
        // DUPLICATE REGISTRATION CHECK
        // =========================================

        boolean alreadyRegistered =
                registrationRepository
                        .existsByEmailAndEventId(
                                registration.getEmail(),
                                registration.getEventId()
                        );

        if (alreadyRegistered) {

            throw new RuntimeException(
                    "You have already registered for this event."
            );
        }

        // =========================================
        // CHECK EVENT CAPACITY
        // =========================================

        if (event.getCapacity() != null &&
                event.getRegisteredCount() >= event.getCapacity()) {

            throw new RuntimeException(
                    "Registration is full for this event."
            );
        }

        // =========================================
        // SET REGISTRATION DETAILS
        // =========================================

        registration.setStatus("Confirmed");

        registration.setRegisteredAt(
                LocalDateTime.now().toString()
        );

        // =========================================
        // SAVE REGISTRATION
        // =========================================

        Registration savedRegistration =
                registrationRepository.save(registration);

        // =========================================
        // INCREASE REGISTERED COUNT
        // =========================================

        Integer currentCount =
                event.getRegisteredCount();

        if (currentCount == null) {
            currentCount = 0;
        }

        event.setRegisteredCount(
                currentCount + 1
        );

        eventRepository.save(event);

        return savedRegistration;
    }


    // =========================================
    // GET ALL REGISTRATIONS
    // =========================================

    public List<Registration> getAllRegistrations() {

        return registrationRepository.findAll();
    }


    // =========================================
    // GET REGISTRATIONS BY EVENT
    // =========================================

    public List<Registration> getRegistrationsByEvent(
            Long eventId) {

        return registrationRepository
                .findByEventId(eventId);
    }


    // =========================================
    // GET REGISTRATIONS BY USER EMAIL
    // =========================================

    public List<Registration> getRegistrationsByEmail(
            String email) {

        return registrationRepository
                .findByEmail(email);
    }


    // =========================================
    // GET REGISTRATION BY ID
    // =========================================

    public Registration getRegistrationById(
            Long id) {

        return registrationRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Registration not found with id: "
                                        + id
                        )
                );
    }


    // =========================================
    // DELETE REGISTRATION
    // =========================================

    public void deleteRegistration(Long id) {

        Registration registration =
                registrationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found with id: "
                                                + id
                                )
                        );

        Event event =
                eventRepository
                        .findById(registration.getEventId())
                        .orElse(null);

        registrationRepository.deleteById(id);

        // =========================================
        // DECREASE REGISTERED COUNT
        // =========================================

        if (event != null &&
                event.getRegisteredCount() != null &&
                event.getRegisteredCount() > 0) {

            event.setRegisteredCount(
                    event.getRegisteredCount() - 1
            );

            eventRepository.save(event);
        }
    }
}