package com.eventmanagement.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventmanagement.backend.entity.Event;
import com.eventmanagement.backend.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }


    // =========================================
    // CREATE EVENT
    // =========================================

    public Event createEvent(Event event) {

        if (event.getRegisteredCount() == null) {
            event.setRegisteredCount(0);
        }

        return eventRepository.save(event);
    }


    // =========================================
    // GET ALL EVENTS
    // =========================================

    public List<Event> getAllEvents() {

        return eventRepository.findAll();
    }


    // =========================================
    // GET EVENT BY ID
    // =========================================

    public Event getEventById(Long id) {

        return eventRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Event not found with id: " + id
                    )
                );
    }


    // =========================================
    // UPDATE EVENT
    // =========================================

    public Event updateEvent(
            Long id,
            Event eventDetails) {

        Event existingEvent =
                getEventById(id);


        existingEvent.setTitle(
                eventDetails.getTitle()
        );

        existingEvent.setDescription(
                eventDetails.getDescription()
        );

        existingEvent.setDate(
                eventDetails.getDate()
        );

        existingEvent.setTime(
                eventDetails.getTime()
        );

        existingEvent.setLocation(
                eventDetails.getLocation()
        );

        existingEvent.setCategory(
                eventDetails.getCategory()
        );

        existingEvent.setCapacity(
                eventDetails.getCapacity()
        );

        // Contact phone number
        existingEvent.setContactPhone(
                eventDetails.getContactPhone()
        );


        return eventRepository.save(
                existingEvent
        );
    }


    // =========================================
    // DELETE EVENT
    // =========================================

    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {

            throw new RuntimeException(
                "Event not found with id: " + id
            );
        }

        eventRepository.deleteById(id);
    }
}