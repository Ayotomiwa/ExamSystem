package dev.serverwizards.examsystem.repository;

import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.model.ExamVenue;
import dev.serverwizards.examsystem.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamVenueRepository extends JpaRepository<ExamVenue, Long> {
    List<ExamVenueRepository> findByExam(Exam exam);
    List<ExamVenueRepository> findByVenue(Venue venue);
    List<ExamVenueRepository> findByExamAndVenue(Exam exam, Venue venue);
}
