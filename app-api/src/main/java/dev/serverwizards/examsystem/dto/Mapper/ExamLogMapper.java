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
    @Mapping(target = "exam.day", qualifiedByName = "changeDateFormatToString")
    @Mapping(source = "exam.course.moduleCode", target = "moduleCode")
    @Mapping(source = "exam.course.moduleName", target = "moduleName")
    @Mapping( target = "exam", ignore = true)
    ExamLogsDto toDto(ExamLogs examLog);



//    @Mapping(target="exam.day", qualifiedByName = "changeStringFormatToDate")
//    @Mapping(source = "exam", target = "exam")
    ExamLogs toEntity(ExamLogsDto examLogDto);
}
