package dev.serverwizards.examsystem.dto.Mapper;

import dev.serverwizards.examsystem.dto.ExamDto;
import dev.serverwizards.examsystem.model.types.ExamType;
import dev.serverwizards.examsystem.model.Exam;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Component
@Mapper(componentModel = "spring", uses = { ModuleMapper.class, ExamLogMapper.class})
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
        return day.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @Named("changeStringFormatToDate")
    default LocalDate changeStringFormatToDate(String day) {
        return LocalDate.parse(day, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @Named("changeStringFormatToLocalTime")
    default LocalTime changeStringFormatToLocalTime(String time) {
        return LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm"));
    }

    @Named("changeLocalTimeFormatToString")
    default String changeLocalTimeFormatToString(LocalTime time) {
        if(time == null)
            return null;
        return time.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    @Mapping(target = "type", qualifiedByName = "mapExamTypeToString")
    @Mapping(target = "examDay", qualifiedByName = "changeDateFormatToString")
    @Mapping(source = "id", target = "examId")
    @Mapping(target = "startTime", qualifiedByName = "changeLocalTimeFormatToString")
    @Mapping(target = "endTime", qualifiedByName = "changeLocalTimeFormatToString")
//    @Mapping( target = "examLogs", ignore = true)
    ExamDto toDto(Exam exam);

    @Mapping(target = "type", qualifiedByName = "mapStringToExamType")
    @Mapping(target = "examDay", qualifiedByName = "changeStringFormatToDate")
    @Mapping(target = "startTime", qualifiedByName = "changeStringFormatToLocalTime")
    @Mapping(target = "endTime", qualifiedByName = "changeStringFormatToLocalTime")
    @Mapping(source = "examId", target = "id")
//    @Mapping( target = "examLogs", ignore = true)
    Exam toEntity(ExamDto examDto);

}



