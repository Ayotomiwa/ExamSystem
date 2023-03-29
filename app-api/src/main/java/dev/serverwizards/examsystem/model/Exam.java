package dev.serverwizards.examsystem.model;
import dev.serverwizards.examsystem.model.types.ExamType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Exam")
    public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="exam_day")
    private LocalDate examDay;
    @Column(name = "start_time")
    private LocalTime startTime;
    @Column(name = "end_time")
    private LocalTime endTime;
    @Column(length = 4,name="exam_year")
    private String year;
    @Column(length = 10,name="semester")
    @Enumerated(EnumType.STRING)
    private ExamType type;


    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    private Module module;


    @OneToMany(mappedBy = "exam", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ExamLogs> examLogs = new ArrayList<>();

}
