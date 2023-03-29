package dev.serverwizards.examsystem.service;

import dev.serverwizards.examsystem.dto.ExamDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;


public interface ExamService {

    ExamDto save(ExamDto examDto);

    Page<ExamDto> listExams(PageRequest pageRequest);
    Boolean delete(long id);
    ExamDto getById(Long id);

    List<ExamDto> getExamBySearch(String name);

    Page<ExamDto> getExamBySearchAndPage(String name, PageRequest page);

    Long findExamId(ExamDto examDto);

    List<ExamDto> getDailyExam();
}
