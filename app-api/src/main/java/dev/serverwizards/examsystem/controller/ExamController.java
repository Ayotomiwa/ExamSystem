package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.dto.ExamDto;
import dev.serverwizards.examsystem.service.implementation.ExamServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamServiceImpl service;

    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping("")
    public Page<ExamDto> exam(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<String> sort,
            @RequestParam Optional<Long> size
            ) {

        System.out.println(Sort.Direction.valueOf(sort.orElse("ASC")));

        System.out.println(sort);
        return service.listExams(
                PageRequest.of(page.orElse(0),
                        size.orElse(30L).intValue(), Sort.Direction.valueOf(sort.orElse("ASC")), sortBy.orElse("id")));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ExamDto addExam(@RequestBody ExamDto exam) {
       return service.save(exam);
    }

    @GetMapping("/daily")
    public List<ExamDto> getDailyExam() {
        return service.getDailyExam();
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping("/search")
    public Page<ExamDto> searchExams(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<String> sort,
            @RequestParam Optional<Long> size,
            @RequestParam(required = false) String query)
    {

        System.out.println(Sort.Direction.valueOf(sort.orElse("ASC")));

        System.out.println(sort);
        return service.getExamBySearchAndPage(query,
                PageRequest.of(page.orElse(0),
                        size.orElse(10L).intValue(), Sort.Direction.valueOf(sort.orElse("ASC")), sortBy.orElse("id")));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTH_USER')")
    @GetMapping ("/exam/{id}")
    public ExamDto findExamById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/exam/{id}")
    public Boolean deleteExam(@PathVariable long id){
       return service.delete(id);
    }
}
