package dev.serverwizards.examsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamDto {
    private Long examId;
    private String examDay;
    private String startTime;
    private String endTime;
    private String year;
    private String type;
//    private List<ExamLogsDto> examLogs;
    private ModuleDto module;
}