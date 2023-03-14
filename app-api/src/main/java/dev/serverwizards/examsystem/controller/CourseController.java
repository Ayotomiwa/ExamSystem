package dev.serverwizards.examsystem.controller;

import dev.serverwizards.examsystem.model.Course;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/module")
public class CourseController {


    private final CourseRepository repository;

    public CourseController(CourseRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{limit}")
    public List<Course> exams(@PathVariable int limit) {
        return repository.findAll();
    }

    @PostMapping("/add")
    public Course addModule(@RequestBody Course course) {
        course.setModuleCode(course.getModuleCode());
        return repository.save(course);
    }

//    @GetMapping ("/module/{id}")
//    public Optional<Module> findExamById(@PathVariable String id) {
//        return repository.findById(id);
//    }

    @DeleteMapping("/{id}")
    public Exam deleteExam(@PathVariable long id){
        return null;
    }
}
