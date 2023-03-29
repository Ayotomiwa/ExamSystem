package dev.serverwizards.examsystem.service;


import dev.serverwizards.examsystem.dto.ModuleDto;

import java.util.List;

public interface ModuleService {


    ModuleDto save(ModuleDto moduleDto);

    List<ModuleDto> findAllCourses();
    Boolean delete(long id);
    ModuleDto findById(long id);

    Long findByModuleCode(String moduleCode);
}
