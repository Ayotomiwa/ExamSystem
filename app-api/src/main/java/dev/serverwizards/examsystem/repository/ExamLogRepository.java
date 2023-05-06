package dev.serverwizards.examsystem.repository;

import dev.serverwizards.examsystem.model.ExamLogs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamLogRepository extends JpaRepository<ExamLogs, Long> {

    Page<ExamLogs> findByExam_id(PageRequest p, long examId);

    List<ExamLogs> findAllByExamId(Sort sort, Long examId);



}
