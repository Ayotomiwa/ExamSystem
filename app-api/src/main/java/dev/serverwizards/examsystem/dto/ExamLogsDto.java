package dev.serverwizards.examsystem.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


import java.time.LocalDate;
import java.time.LocalTime;


@Data
@RequiredArgsConstructor
public class ExamLogsDto {
    private Long id;
    private String venue;
    private String message;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate submittedDate;
    private int studentsLogged;
    private String moduleName;
    private String moduleCode;
//    private ExamDto exam;
}
