package dev.serverwizards.examsystem.service;


import dev.serverwizards.examsystem.dto.CourseDto;
import dev.serverwizards.examsystem.model.Course;

import java.util.List;

public interface CourseService {


    CourseDto save(CourseDto courseDto);

    List<CourseDto> findAllCourses();
    Boolean delete(long id);
    CourseDto findById(long id);

    Long findByModuleCode(String moduleCode);
}
