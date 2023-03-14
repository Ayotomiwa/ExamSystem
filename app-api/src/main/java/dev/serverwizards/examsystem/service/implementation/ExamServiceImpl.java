package dev.serverwizards.examsystem.service.implementation;
import dev.serverwizards.examsystem.dto.ExamDto;
import dev.serverwizards.examsystem.dto.Mapper.ExamMapper;
import dev.serverwizards.examsystem.model.Exam;
import dev.serverwizards.examsystem.repository.ExamRepository;
import dev.serverwizards.examsystem.service.ExamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ExamServiceImpl implements ExamService {

    private final ExamRepository repo;
    private final ExamMapper examMapper;


    @Override
    public ExamDto save(ExamDto examDto) {
        Exam exam = examMapper.toEntity(examDto);
        exam = repo.save(exam);
        return examMapper.toDto(exam);
    }

    @Override
    public Page<ExamDto> listExams(PageRequest pageRequest) {

//        System.out.println("Sorting by" + pageRequest.getSort());
        Page<Exam> exams = repo.findAll(pageRequest);
        return exams.map(examMapper::toDto);
    }

    @Override
    public Boolean delete(long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ExamDto getById(Long id) {
        Exam exam = repo.getReferenceById(id);
        return examMapper.toDto(exam);
    }

    @Override
    public List<ExamDto> getExamBySearch(String query)   {
        if (query == null || query.trim().isEmpty()) {
            List<Exam> exams = repo.findAll();
            System.out.println(exams.size());
            return exams.stream().map(examMapper::toDto).collect(Collectors.toList());
        }
        String searchPattern = "%" + query.trim() + "%";
        List<Exam>exams = repo.findByCourseFieldsContainingIgnoreCase(searchPattern);
        return exams.stream().map(examMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ExamDto> getExamBySearchAndPage(String query, PageRequest page)   {
        if (query == null || query.trim().isEmpty()) {
            Page<Exam> exams = repo.findAll(page);
            return exams.map(examMapper::toDto);
        }
        String searchPattern = "%" + query.trim() + "%";
        Page<Exam>exams = repo.findByCourseFieldsContainingIgnoreCase(searchPattern, page);
        return exams.map(examMapper::toDto);
    }


    @Override
    public Long findExamId(ExamDto examDto) {
        Exam exam = examMapper.toEntity(examDto);
        Example<Exam> example = Example.of(exam);
        Optional<Exam> result = repo.findOne(example);
        return result.map(Exam::getId).orElse(null);
    }
}


