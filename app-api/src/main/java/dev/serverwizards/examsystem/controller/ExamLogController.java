package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.service.implementation.ExamLogServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
@RequestMapping("/api/exam-logs")
public class ExamLogController {


    private final ExamLogServiceImpl service;


    @GetMapping("/page/{exam_id}")
    public Page<ExamLogsDto> examLogsByPages(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<Long> size,
            @PathVariable Long exam_id) {

        return service.listExamLogsByExamIdInPages(
                PageRequest.of(page.orElse(0),
                        size.orElse(10L).intValue(),
                Sort.Direction.ASC, sortBy.orElse("examId")),exam_id );
    }

    @GetMapping("/{exam_id}")
    public List<ExamLogsDto> examLogs(
            @RequestParam Optional<String> sortBy,
            @PathVariable Long exam_id) {

        return service.listExamLogsByExamId(
                Sort.by(Sort.Direction.ASC, sortBy.orElse("examId")), exam_id);
    }

    @PostMapping("/create")
    public ExamLogsDto addExamLog(@RequestBody ExamLogsDto examLog) {
        System.out.println("Start Time: "+examLog.getStartTime());
        System.out.println("Start Time: "+examLog.getEndTime());
           examLog.setSubmittedDate("2023-03-07");
          return service.save(examLog);
    }


    @GetMapping("/log/{id}")
    public ExamLogsDto findExamLogById(@PathVariable long id) {
        return service.getById(id);
    }


    @DeleteMapping("/exam-logs/{id}")
    public Boolean deleteExamLog(@PathVariable long id){
        return service.delete(id);
    }

}
