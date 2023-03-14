package dev.serverwizards.examsystem.repository;

import dev.serverwizards.examsystem.model.ExamLogs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamLogRepository extends JpaRepository<ExamLogs, Long> {

    Page<ExamLogs> findByExam_id(PageRequest p, long examId);

}
