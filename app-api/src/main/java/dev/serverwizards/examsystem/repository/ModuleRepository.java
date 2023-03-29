


package dev.serverwizards.examsystem.repository;


import dev.serverwizards.examsystem.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Long findByModuleCode(String moduleCode);

//    Optional<Course> findByModuleCodeAndModuleName(String moduleCode, String moduleName);

    Course findByModuleCodeAndModuleName(String moduleCode, String moduleName);

    boolean existsByModuleCodeAndModuleName(String moduleCode, String moduleName);
}

