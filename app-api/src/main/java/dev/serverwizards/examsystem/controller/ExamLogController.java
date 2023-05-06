package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.service.implementation.ExamLogServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
@RequestMapping("/api/exam-logs")
public class ExamLogController {


    private final ExamLogServiceImpl service;


    @GetMapping("/page/{exam_id}")
    public ResponseEntity<Page<ExamLogsDto>> examLogsByPages(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<Long> size,
            @PathVariable Long exam_id) {

        Page<ExamLogsDto> examLogs = service.listExamLogsByExamIdInPages(
                PageRequest.of(page.orElse(0),
                        size.orElse(10L).intValue(),
                Sort.Direction.ASC, sortBy.orElse("examId")),exam_id );

        return ResponseEntity.ok(examLogs);
    }

    @GetMapping("/{exam_id}")
    public ResponseEntity<List<ExamLogsDto>> examLogs(
            @RequestParam Optional<String> sortBy,
            @PathVariable Long exam_id) {

        List<ExamLogsDto> examLogs = service.listExamLogsByExamId(
                Sort.by(Sort.Direction.ASC,
                        sortBy.orElse("examId")),
                exam_id);
        return ResponseEntity.ok(examLogs);
    }



    @PostMapping("/create")
    public ResponseEntity<ExamLogsDto> addExamLog(@RequestBody ExamLogsDto examLog) {
          examLog.setSubmittedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
          ExamLogsDto examLogs = service.save(examLog);
        return ResponseEntity.ok(examLogs);
    }


    @GetMapping("/log/{id}")
    public ExamLogsDto getExamLogById(@PathVariable long id) {
        return service.getById(id);
    }


    @DeleteMapping("/{id}")
    public Boolean deleteExamLog(@PathVariable long id){
        return service.delete(id);
    }

}
