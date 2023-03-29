package dev.serverwizards.examsystem.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
    private Long courseId;
    private String moduleName;
    private String moduleCode;
    private Long registeredStudents;
    private String moduleLeader;
    @JsonIgnore
    private List<ExamDto> exams;
}
