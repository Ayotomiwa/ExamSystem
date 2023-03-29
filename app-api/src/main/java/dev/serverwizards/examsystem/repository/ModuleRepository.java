


package dev.serverwizards.examsystem.repository;


import dev.serverwizards.examsystem.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Long> {

    Long findByModuleCode(String moduleCode);

//    Optional<Course> findByModuleCodeAndModuleName(String moduleCode, String moduleName);

    Module findByModuleCodeAndModuleName(String moduleCode, String moduleName);

    boolean existsByModuleCodeAndModuleName(String moduleCode, String moduleName);
}

