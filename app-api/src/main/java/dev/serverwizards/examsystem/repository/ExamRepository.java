package dev.serverwizards.examsystem.repository;

import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.model.types.ExamType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {


    @Query("SELECT e.id FROM Exam e WHERE e.type= :type AND e.year= :year AND e.examDay= :day")
    Long getOneIdByExam(ExamType type, String year, LocalDate day);

    @Query("select e from Exam e where lower(e.module.moduleName) like lower(:searchPattern) or " +
            "lower(e.module.moduleCode) like lower(:searchPattern)")
    List<Exam> findByCourseFieldsContainingIgnoreCase(@Param("searchPattern") String searchPattern);

    Optional<Exam> findByTypeAndYearAndExamDay(ExamType type, String year, LocalDate day);

//   Page<Exam>findAllOrderByModuleCode(PageRequest pageRequest);


    @Query("select e from Exam e where lower(e.module.moduleName) like lower(:searchPattern) or " +
            "lower(e.module.moduleCode) like lower(:searchPattern)")
    Page<Exam> findByCourseFieldsContainingIgnoreCase(@Param("searchPattern") String searchPattern, PageRequest pageRequest);


    Optional<Exam> findByExamDayAndModule_courseId(LocalDate day, long courseId);


    List<Exam> findByExamDay(LocalDate day);
}
