package dev.serverwizards.examsystem.dto.Mapper;

import dev.serverwizards.examsystem.dto.ExamDto;
import dev.serverwizards.examsystem.model.types.ExamType;
import dev.serverwizards.examsystem.model.Exam;
import org.mapstruct.*;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Component
@Mapper(componentModel = "spring", uses = { CourseMapper.class, ExamLogMapper.class})
public interface ExamMapper {


    @Named("mapStringToExamType")
    default ExamType mapStringToExamType(String examType) {
        if (examType == null) {
            return ExamType.NORMAL;
        }
        return ExamType.valueOf(examType);
    }

    @Named("mapExamTypeToString")
    default String mapExamTypeToString(ExamType examType) {
        if (examType == null) {
            return "NORMAL";
        }
        return examType.name();
    }

    @Named("changeDateFormatToString")
    default String changeDateFormat(LocalDate day) {
        return day.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }

    @Named("changeStringFormatToDate")
    default LocalDate changeStringFormatToDate(String day) {
        return LocalDate.parse(day, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @Mapping(target = "type", qualifiedByName = "mapExamTypeToString")
    @Mapping(target = "examDay", qualifiedByName = "changeDateFormatToString")
    @Mapping(source = "id", target = "examId")
//    @Mapping( target = "examLogs", ignore = true)
    ExamDto toDto(Exam exam);

    @Mapping(target = "type", qualifiedByName = "mapStringToExamType")
    @Mapping(target = "examDay", qualifiedByName = "changeStringFormatToDate")
//    @Mapping( target = "examLogs", ignore = true)
    Exam toEntity(ExamDto examDto);

}



