package dev.serverwizards.examsystem.dto.Mapper;

import dev.serverwizards.examsystem.dto.ModuleDto;
import dev.serverwizards.examsystem.model.Module;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;


@Component
@Mapper(componentModel = "spring")
public interface ModuleMapper {
    @Mapping( target = "exams", ignore = true)
    ModuleDto toDto(Module module);

    Module toEntity(ModuleDto moduleDto);

}
