package dev.serverwizards.examsystem.service.implementation;

import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.dto.Mapper.ModuleMapper;
import dev.serverwizards.examsystem.dto.Mapper.ExamLogMapper;
import dev.serverwizards.examsystem.dto.Mapper.ExamMapper;
import dev.serverwizards.examsystem.model.Module;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.model.ExamLogs;
import dev.serverwizards.examsystem.repository.ModuleRepository;
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
    private final ModuleRepository moduleRepo;
    private final ExamLogMapper examLogMapper;
    private final ExamMapper examMapper;
    private final ModuleMapper moduleMapper;

    @Override
    public ExamLogsDto save(ExamLogsDto examLogsDto) {


        String moduleCode = examLogsDto.getModuleCode();
        String moduleName = examLogsDto.getModuleName();
        ExamLogs examLogs = examLogMapper.toEntity(examLogsDto);

        Module module;
        Exam exam;

        if(moduleRepo.existsByModuleCodeAndModuleName(moduleCode, moduleName)) {
            System.out.println("Course exists");
            module = moduleRepo.findByModuleCodeAndModuleName(moduleCode, moduleName);
            System.out.println("DATE: " + examLogsDto.getSubmittedDate());
            exam = examRepo.findByExamDayAndModule_courseId(examLogsDto.getSubmittedDate(),
                    module.getCourseId()).orElseGet(() -> {
                    System.out.println("Exam does not exist");
                        Exam newExam = new Exam();
                        newExam.setModule(module);
                        newExam.setExamDay(examLogsDto.getSubmittedDate());
                        return examRepo.save(newExam);
                    });
        }
        else{
            System.out.println("Course does not exist");
            module = new Module();
            module.setModuleCode(moduleCode);
            module.setModuleName(moduleName);
            moduleRepo.save(module);
            exam = new Exam();
            exam.setModule(module);
            exam.setExamDay(examLogsDto.getSubmittedDate());
            exam.setModule(module);
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



