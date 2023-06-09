package dev.serverwizards.examsystem.repository;

import dev.serverwizards.examsystem.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    Optional<Venue> findByName(String name);
    boolean existsByName(String name);

}
