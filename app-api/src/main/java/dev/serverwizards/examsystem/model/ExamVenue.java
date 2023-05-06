package dev.serverwizards.examsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "exam_venue")
@AllArgsConstructor
@NoArgsConstructor
public class ExamVenue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "examId", referencedColumnName = "id")
    Exam exam;

    @ManyToOne
    @JoinColumn(name = "venueId", referencedColumnName = "id")
    Venue venue;


}
