package dev.serverwizards.examsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
//
//    private List<Exam> exams = new ArrayList<>();


    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL)
    private List<ExamLogs> examLogs = new ArrayList<>();


    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL)
    List<ExamVenue> examVenues;

}
