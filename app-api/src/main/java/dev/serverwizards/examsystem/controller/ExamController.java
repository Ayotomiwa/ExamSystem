package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.dto.ExamDto;
import dev.serverwizards.examsystem.service.implementation.ExamServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamServiceImpl service;

//    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping("")
    public ResponseEntity<Page<ExamDto>> exam(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<String> sort,
            @RequestParam Optional<Long> size
    ) {

        Page<ExamDto> exams =  service.listExams(
                PageRequest.of(page.orElse(0),
                        size.orElse(30L).intValue(),
                        Sort.Direction.valueOf(sort.orElse("ASC")),
                        sortBy.orElse("id")));
        return ResponseEntity.ok(exams);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ExamDto> createExam(@RequestBody ExamDto exam) {
        ExamDto createdExam = service.save(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExam);
    }


    @GetMapping("/daily")
    public ResponseEntity<List<ExamDto>> getDailyExam() {
        List<ExamDto> dailyExams = service.getDailyExam();
        return ResponseEntity.ok(dailyExams);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ExamDto>> getRecentExam() {
        List<ExamDto> recentExams = service.getRecentExam();
        return ResponseEntity.ok(recentExams);
    }



//    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<ExamDto>> searchExams(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<String> sort,
            @RequestParam Optional<Long> size,
            @RequestParam(required = false) String query
    ) {
        Page<ExamDto> searchResults = service.getExamBySearchAndPage(query,
                PageRequest.of(
                        page.orElse(0),
                        size.orElse(10L).intValue(),
                        Sort.Direction.valueOf(sort.orElse("ASC")),
                        sortBy.orElse("id")
                )
        );
        return ResponseEntity.ok(searchResults);
    }

//    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping("/exam/{id}")
    public ExamDto findExamById(@PathVariable Long id) {
        return service.getById(id);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable long id) {
        boolean deleted = service.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
