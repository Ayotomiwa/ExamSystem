import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
    Paper, Typography,
} from '@mui/material';
import { Close, Print } from '@mui/icons-material';
import { styled } from '@mui/system';


const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '50%',
        maxWidth: '50%',
        margin: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
    },
}));

const StyledDialogTitle = styled(DialogTitle)({
    backgroundColor: '#584595',
    color: '#ffffff',
    alignItems: 'center',
});

const StyledIconButton = styled(IconButton)({
    color: '#ffffff',
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    backgroundColor: 'yellow',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledButton = styled(Button)({
    color: '#584595',
});

const StyledTypography = styled(Typography)({
    color: '#584595',
    fontStyle: 'italic',
});


const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Box marginBottom={2}>
            <Button
                variant="text"
                onClick={() => setIsOpen(!isOpen)}
                fullWidth
            >
                <Typography variant="h6">{title}</Typography>
            </Button>
            <Collapse in={isOpen} >
                {children}
            </Collapse>
        </Box>
    );
};

const LogModal = ({ open, logId, handleClose }) => {
    const [logs, setLogs] = useState([]);
    const [exam, setExam] = useState([]);
    const [examId, setExamId] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/exam-logs/log/${logId}`)
            .then(response => response.json())
            .then(data => {
                setLogs(data);
                setExamId(data.examId);
            })
            .catch(error => console.log(error));
    }, [open, logId]);

    useEffect(() => {
        console.log('examId in modal:  ', examId);
        if (examId === null) {
            return;
        }
        fetch(`http://localhost:8080/api/exams/exam/${examId}`)
            .then(response => response.json())
            .then(data => {
                setExam(data);
                console.log('exam in modallll:  ', data.module);
            })
            .catch(error => console.log(error));
    }, [examId]);


    const examLogs = useMemo(() => {
        if (!logs || !exam || !exam.module) return {};

        return {
            startTime: logs.startTime,
            venue: logs.venue,
            endTime: logs.endTime,
            notes: logs.message,
            studentsInVenue: logs.studentsLogged,
            submittedDate: logs.submittedDate,
            moduleName: exam.module.moduleName,
            moduleCode: exam.module.moduleCode,
            predictedStartTime: exam.startTime,
            totalStudents: exam.module.registeredStudents,
            moduleLeader: exam.module.moduleLeader
        };
    }, [logs, exam]);

    const printModal = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write('<html lang="en"><head><title>Print Modal</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write("<h1>Exam Logs</h1>");


        const contentToPrint = document.getElementById("collapsible-modal-content");
        if (contentToPrint) {
            const clonedContentToPrint = contentToPrint.cloneNode(true);
            const scrollableField = clonedContentToPrint.querySelector("div[style*='overflow: auto']");
            if (scrollableField) {
                scrollableField.style.overflow = 'visible';
                scrollableField.style.height = 'auto';
                scrollableField.style.maxHeight = 'none';
                scrollableField.style.padding = '0';
                scrollableField.style.marginTop = '0';
                scrollableField.style.border = 'none';
            }

            // Temporarily expand all sections
            const collapsibleSections = clonedContentToPrint.querySelectorAll(".MuiCollapse-root");
            collapsibleSections.forEach((section) => {
                section.style.height = "auto";
                section.classList.add("MuiCollapse-entered");
            });

            printWindow.document.write(clonedContentToPrint.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
        }
    };


    return (
        <StyledDialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <StyledDialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    Exam Logs
                    <StyledIconButton edge="end" color="inherit" onClick={handleClose} >
                        <Close />
                    </StyledIconButton>
                </Box>
            </StyledDialogTitle>
            <StyledDialogContent id="collapsible-modal-content" >
                <CollapsibleSection title="Module Information">
                    <Typography>
                        <strong>Module Name:</strong> {examLogs.moduleName}
                    </Typography>
                    <Typography>
                        <strong>Module Code:</strong> {examLogs.moduleCode}
                    </Typography>
                    <Typography>
                        <strong>Module Leader:</strong> {examLogs.moduleLeader}
                    </Typography>
                </CollapsibleSection>

                <CollapsibleSection title="Attendance Information">
                    <Typography>
                        <strong>Students in Venue:</strong> {examLogs.studentsInVenue}
                    </Typography>
                    <Typography>
                        <strong>Total Students in Exam:</strong>{examLogs.totalStudents}
                    </Typography>
                    <Typography>
                        <strong>% in Venue:</strong> {examLogs.studentsInVenue / examLogs.totalStudents * 100}%
                    </Typography>
                </CollapsibleSection>

                <CollapsibleSection title="Exam Information">
                    <Typography>
                        <strong>Predicted Start Time:</strong> {examLogs.predictedStartTime}
                    </Typography>
                    <Typography>
                        <strong>Start Time:</strong> {examLogs.startTime}
                    </Typography>
                    <Typography>
                        <strong>End Time:</strong> {examLogs.endTime}
                    </Typography>
                    <Typography>
                        <strong>Duration:</strong> {examLogs.startTime} - {examLogs.endTime};
                    </Typography>
                    <Typography>
                        <strong>Venue:</strong> {examLogs.venue}
                    </Typography>
                    <Typography>
                        <strong>Issues Log:</strong>
                    </Typography>
                    <Box
                        component={Paper}
                        minHeight={200}
                        maxHeight={250}
                        overflow="auto"
                        padding={1}
                        marginTop={1}
                    >
                            <StyledTypography>
                                {examLogs.notes}
                            </StyledTypography>
                    </Box>
                </CollapsibleSection>
            </StyledDialogContent>

            <StyledDialogActions>
                <StyledButton color="primary" onClick={printModal} startIcon={<Print />}>
                    Print
                </StyledButton>
                <StyledTypography variant="caption" sx={{ flexGrow: 1, textAlign: "right" }}>
                    Submitted by: Guest
                </StyledTypography>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default LogModal;
