package dev.serverwizards.examsystem.dto.Mapper;

import dev.serverwizards.examsystem.dto.CourseDto;
import dev.serverwizards.examsystem.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;


@Component
@Mapper(componentModel = "spring")
public interface CourseMapper {
    @Mapping( target = "exams", ignore = true)
    CourseDto toDto(Course course);

    Course toEntity(CourseDto courseDto);

}
