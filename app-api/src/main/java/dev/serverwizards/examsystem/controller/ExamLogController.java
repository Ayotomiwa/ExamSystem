package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.service.implementation.ExamLogServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exam-logs")
public class ExamLogController {


    private final ExamLogServiceImpl service;


    @GetMapping("/{exam_id}")
    public Page<ExamLogsDto> examLogs(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<Long> size,
            @PathVariable Long exam_id) {

        return service.listExamLogsByExamId(
                PageRequest.of(page.orElse(0),
                        size.orElse(10L).intValue(),
                Sort.Direction.ASC, sortBy.orElse("examId")),exam_id );
    }


    @PostMapping("")
    public ExamLogsDto addExamLog(@RequestBody ExamLogsDto examLog) {
           examLog.setSubmittedDate(LocalDate.parse("2023-03-07"));
//           examLog.getExam().setYear("2023");
//           examLog.getExam().setDay("2023-02-28");
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
