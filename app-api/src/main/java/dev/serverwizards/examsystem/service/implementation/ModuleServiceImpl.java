package dev.serverwizards.examsystem.service.implementation;


import dev.serverwizards.examsystem.dto.ModuleDto;
import dev.serverwizards.examsystem.dto.Mapper.ModuleMapper;
import dev.serverwizards.examsystem.model.Module;
import dev.serverwizards.examsystem.repository.ModuleRepository;
import dev.serverwizards.examsystem.service.ModuleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository repo;
    private final ModuleMapper mapper;


    @Override
    public ModuleDto save(ModuleDto moduleDto) {
        Module module = mapper.toEntity(moduleDto);
        module = this.repo.save(module);
        return mapper.toDto(module);
    }

    @Override
    public List<ModuleDto> findAllCourses() {
        List<Module> cours = this.repo.findAll();
        return cours.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Boolean delete(long id) {
        if (this.repo.existsById(id)) {
            this.repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ModuleDto findById(long id) {
        Module module = this.repo.getReferenceById(id);
        return mapper.toDto(module);
    }

    @Override
    public Long findByModuleCode(String moduleCode) {
        return repo.findByModuleCode(moduleCode);
    }
}


