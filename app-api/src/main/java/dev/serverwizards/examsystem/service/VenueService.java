package dev.serverwizards.examsystem.service;

import dev.serverwizards.examsystem.model.Venue;

import java.util.List;
import java.util.Optional;

public interface VenueService {
    Venue save(Venue venueDto);
    List<Venue> findAllVenues();
    Boolean delete(long id);
    Venue findById(long id);
    Optional<Venue> findByName(String name);
}
