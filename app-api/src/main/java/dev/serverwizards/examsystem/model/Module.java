package dev.serverwizards.examsystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import dev.serverwizards.examsystem.dto.CourseDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NaturalId;


import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Course")
public class Course {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long courseId;
        @NaturalId
        @Column(length = 10)
        private String moduleCode;
        private String moduleName;
        private String moduleLeader;
        private int registeredStudents;
        

        @JsonIgnore
        @OneToMany(mappedBy = "course", orphanRemoval = true, fetch = FetchType.LAZY)
        private List<Exam> exams = new ArrayList<>();

}
