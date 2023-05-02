package dev.serverwizards.examsystem.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;


import java.time.LocalDate;
import java.time.LocalTime;


@Data
@RequiredArgsConstructor
public class ExamLogsDto {
    private Long id;
    private String venue;
    private String message;
    private String examDay;
    private String examStartTime;
    private long registeredStudents;
    private String startTime;
    private String endTime;
    private String submittedDate;
    private long studentsNo;
    private String moduleName;
    private String moduleCode;
    private long examId;
}
