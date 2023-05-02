package dev.serverwizards.examsystem.service;


import dev.serverwizards.examsystem.dto.ExamLogsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ExamLogService {

    ExamLogsDto save(ExamLogsDto examLogDto);

    Page<ExamLogsDto> listExamLogsByExamIdInPages(PageRequest p, long examId);


    List<ExamLogsDto> listExamLogsByExamId(Sort sort, Long exam_id);

    Boolean delete(long id);

    ExamLogsDto getById(long id);

    List<ExamLogsDto> findALL();
}
