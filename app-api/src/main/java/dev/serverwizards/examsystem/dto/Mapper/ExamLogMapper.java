package dev.serverwizards.examsystem.dto.Mapper;

import dev.serverwizards.examsystem.dto.ExamLogsDto;
import dev.serverwizards.examsystem.model.ExamLogs;
import dev.serverwizards.examsystem.model.types.ExamType;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring", uses = {ExamMapper.class })
public interface ExamLogMapper {


//    @Mapping(source = "exam.id", target = "exam.examId")
    @Mapping(target = "exam.examDay", qualifiedByName = "changeDateFormatToString")
    @Mapping(target = "submittedDate", qualifiedByName = "changeDateFormatToString")
    @Mapping(target = "exam.startTime", qualifiedByName = "changeLocalTimeFormatToString")
    @Mapping(target = "exam.endTime", qualifiedByName = "changeLocalTimeFormatToString")
    @Mapping(target = "startTime", qualifiedByName = "changeLocalTimeFormatToString")
    @Mapping(target = "endTime", qualifiedByName = "changeLocalTimeFormatToString")
    @Mapping(source = "exam.startTime", target = "examStartTime")
    @Mapping(source = "exam.id", target = "examId")
    @Mapping(source = "exam.examDay", target = "examDay")
    @Mapping(source = "exam.module.registeredStudents", target = "registeredStudents")
    @Mapping(source = "exam.module.moduleCode", target = "moduleCode")
    @Mapping(source = "exam.module.moduleName", target = "moduleName")
    @Mapping(source = "venue.name", target = "venue")
    ExamLogsDto toDto(ExamLogs examLog);



    @Mapping(target="submittedDate", qualifiedByName = "changeStringFormatToDate")
    @Mapping(target="startTime", qualifiedByName = "changeStringFormatToLocalTime")
    @Mapping(target="endTime", qualifiedByName = "changeStringFormatToLocalTime")
    @Mapping(source="venue", target="venue.name")
//    @Mapping(source = "exam", target = "exam")
    ExamLogs toEntity(ExamLogsDto examLogDto);
}
