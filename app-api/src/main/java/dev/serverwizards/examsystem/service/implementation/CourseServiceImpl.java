package dev.serverwizards.examsystem.service.implementation;


import dev.serverwizards.examsystem.dto.CourseDto;
import dev.serverwizards.examsystem.dto.Mapper.CourseMapper;
import dev.serverwizards.examsystem.model.Course;
import dev.serverwizards.examsystem.repository.CourseRepository;
import dev.serverwizards.examsystem.service.CourseService;
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
public class CourseServiceImpl implements CourseService {

    private final CourseRepository repo;
    private final CourseMapper mapper;


    @Override
    public CourseDto save(CourseDto courseDto) {
        Course course = mapper.toEntity(courseDto);
        course = this.repo.save(course);
        return mapper.toDto(course);
    }

    @Override
    public List<CourseDto> findAllCourses() {
        List<Course> courses = this.repo.findAll();
        return courses.stream().map(mapper::toDto).collect(Collectors.toList());
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
    public CourseDto findById(long id) {
        Course course = this.repo.getReferenceById(id);
        return mapper.toDto(course);
    }

    @Override
    public Long findByModuleCode(String moduleCode) {
        return repo.findByModuleCode(moduleCode);
    }
}


