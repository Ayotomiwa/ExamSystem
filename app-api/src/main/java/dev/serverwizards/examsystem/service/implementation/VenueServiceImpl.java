package dev.serverwizards.examsystem.service.implementation;

import dev.serverwizards.examsystem.model.Venue;
import dev.serverwizards.examsystem.repository.VenueRepository;
import dev.serverwizards.examsystem.service.VenueService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class VenueServiceImpl implements VenueService {
    private final VenueRepository venueRepo;


    @Override
    public Venue save(Venue venue) {
        venueRepo.save(venue);
        return venue;
    }


    @Override
    public List<Venue> findAllVenues() {
        return venueRepo.findAll();
    }

    @Override
    public Boolean delete(long id) {
        venueRepo.deleteById(id);
        return true;
    }

    @Override
    public Venue findById(long id) {
        return null;
    }

    @Override
    public Optional<Venue> findByName(String name) {
        return venueRepo.findByName(name);
    }
}
