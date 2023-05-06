package dev.serverwizards.examsystem.controller;

import dev.serverwizards.examsystem.model.Module;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.repository.ModuleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/modules")
public class ModuleController {


    private final ModuleRepository repository;

    public ModuleController(ModuleRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public ResponseEntity<List<Module>> exams() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Module> addModule(@RequestBody Module module) {
        module.setModuleCode(module.getModuleCode());
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(module));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
