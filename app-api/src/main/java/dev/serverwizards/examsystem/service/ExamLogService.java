package dev.serverwizards.examsystem.service;


import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.model.ExamLogs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ExamLogService {

    ExamLogsDto save(ExamLogsDto examLogDto);

    Page<ExamLogsDto> listExamLogsByExamId(PageRequest p, long examId);
    Boolean delete(long id);

    ExamLogsDto getById(long id);

    List<ExamLogsDto> findALL();
}
