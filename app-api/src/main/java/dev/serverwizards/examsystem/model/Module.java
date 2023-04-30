package dev.serverwizards.examsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;


import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Course")
public class Module {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long courseId;
        @Column(length = 10)
        private String moduleCode;
        private String moduleName;
        private String moduleLeader;
        private int registeredStudents;
        

        @JsonIgnore
        @OneToMany(mappedBy = "module", orphanRemoval = true, fetch = FetchType.LAZY)
        private List<Exam> exams = new ArrayList<>();

}
