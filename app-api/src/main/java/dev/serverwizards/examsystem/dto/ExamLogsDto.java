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
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate submittedDate;
    private long studentsNo;
    private String moduleName;
    private String moduleCode;
    private long examId;
}
