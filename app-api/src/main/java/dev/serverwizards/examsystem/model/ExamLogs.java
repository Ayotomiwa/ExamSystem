package dev.serverwizards.examsystem.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Examlogs")
public class ExamLogs {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate submittedDate;
    private Long studentsNo;


    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "examId", referencedColumnName = "id")
    private Exam exam;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "venueId", referencedColumnName = "id")
    private Venue venue;

    }

