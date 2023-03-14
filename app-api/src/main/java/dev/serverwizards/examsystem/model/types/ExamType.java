package dev.serverwizards.examsystem.model.types;

import jakarta.persistence.Enumerated;
import org.mapstruct.EnumMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

public enum ExamType {
    RESIT("RESIT"), NORMAL ("NORMA");

   private String type;

    ExamType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
