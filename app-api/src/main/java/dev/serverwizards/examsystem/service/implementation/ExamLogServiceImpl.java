package dev.serverwizards.examsystem.service.implementation;

import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.dto.Mapper.CourseMapper;
import dev.serverwizards.examsystem.dto.Mapper.ExamLogMapper;
import dev.serverwizards.examsystem.dto.Mapper.ExamMapper;
import dev.serverwizards.examsystem.model.Course;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.model.ExamLogs;
import dev.serverwizards.examsystem.repository.CourseRepository;
import dev.serverwizards.examsystem.repository.ExamLogRepository;
import dev.serverwizards.examsystem.repository.ExamRepository;
import dev.serverwizards.examsystem.service.ExamLogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ExamLogServiceImpl implements ExamLogService {

    private final ExamLogRepository logRepo;
    private final ExamRepository examRepo;
    private final CourseRepository courseRepo;
    private final ExamLogMapper examLogMapper;
    private final ExamMapper examMapper;
    private final CourseMapper courseMapper;

    @Override
    public ExamLogsDto save(ExamLogsDto examLogsDto) {


        String moduleCode = examLogsDto.getModuleCode();
        String moduleName = examLogsDto.getModuleName();
        ExamLogs examLogs = examLogMapper.toEntity(examLogsDto);

        Course course;
        Exam exam;


        if(courseRepo.existsByModuleCodeAndModuleName(moduleCode, moduleName)) {
            System.out.println("Course exists");
            course = courseRepo.findByModuleCodeAndModuleName(moduleCode, moduleName);
            exam = examRepo.findByExamDayAndCourse_courseId(examLogsDto.getSubmittedDate(),
                    course.getCourseId()).orElseGet(() -> {
                    System.out.println("Exam does not exist");
                        Exam newExam = new Exam();
                        newExam.setCourse(course);
                        newExam.setExamDay(examLogsDto.getSubmittedDate());
                        return examRepo.save(newExam);
                    });
        }
        else{
            System.out.println("Course does not exist");
            course = new Course();
            course.setModuleCode(moduleCode);
            course.setModuleName(moduleName);
            courseRepo.save(course);
            exam = new Exam();
            exam.setCourse(course);
            exam.setExamDay(examLogsDto.getSubmittedDate());
            exam.setCourse(course);
            examRepo.save(exam);
        }

//        Exam exam = examRepo.findByDayAndCourse_courseId (LocalDate.parse(examLogsDto.getExam().getDay(), DateTimeFormatter.ofPattern("yyyy-MM-dd")),courseDto.getCourseId() )
//                .orElseGet(() -> {
//                    examLogsDto.getExam().setCourse(courseDto);
//                    return examRepo.save(examMapper.toEntity(examLogsDto.getExam()));
//                });

        examLogs.setExam(exam);
        return examLogMapper.toDto(logRepo.save(examLogs));
    }

    @Override
    public Page<ExamLogsDto> listExamLogsByExamId(PageRequest page, long examId) {
        Page<ExamLogs> examLogsPage = logRepo.findByExam_id(page, examId);
        return examLogsPage.map(examLogMapper::toDto);
    }

    @Override
    public ExamLogsDto getById(long id) {
        ExamLogs examLogs = logRepo.getReferenceById(id);
        return examLogMapper.toDto(examLogs);
    }

    @Override
    public List<ExamLogsDto> findALL() {
        List<ExamLogs> examLogsList = logRepo.findAll();
        return examLogsList.stream()
                .map(examLogMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean delete(long id) {
        if (logRepo.existsById(id)) {
            logRepo.deleteById(id);
            return true;
        }
        return false;
    }
    
}



