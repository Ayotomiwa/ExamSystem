package dev.serverwizards.examsystem.controller;

import dev.serverwizards.examsystem.model.Module;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.repository.ModuleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {


    private final ModuleRepository repository;

    public ModuleController(ModuleRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public List<Module> exams() {
        return repository.findAll();
    }

    @PostMapping("/add")
    public Module addModule(@RequestBody Module module) {
        module.setModuleCode(module.getModuleCode());
        return repository.save(module);
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
