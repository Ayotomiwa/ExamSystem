import React, { useState } from 'react';
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

// ... (Rest of the code remains unchanged)


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

const CollapsibleModal = ({ open, handleClose }) => {
    const printModal = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write('<html lang="en"><head><title>Print Modal</title>');
        printWindow.document.write('</head><body className={classes.title}>');
        printWindow.document.write("<h1>Modal Title</h1>");


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
                    Modal Title
                    <StyledIconButton edge="end" color="inherit" onClick={handleClose} >
                        <Close />
                    </StyledIconButton>
                </Box>
            </StyledDialogTitle>
            <StyledDialogContent id="collapsible-modal-content" >
                <CollapsibleSection title="Module Information">
                    <Typography>
                        <strong>Module Name:</strong> Example Module Name
                    </Typography>
                    <Typography>
                        <strong>Module Code:</strong> EXM123
                    </Typography>
                    <Typography>
                        <strong>Module Leader:</strong> Mickey
                    </Typography>
                </CollapsibleSection>

                <CollapsibleSection title="Attendance Information">
                    <Typography>
                        <strong>Students in Venue:</strong> 30
                    </Typography>
                    <Typography>
                        <strong>Total Students in Exam:</strong> 35
                    </Typography>
                    <Typography>
                        <strong>Exam Attendance Rate:</strong> 85%
                    </Typography>
                </CollapsibleSection>

                <CollapsibleSection title="Exam Information">
                    <Typography>
                        <strong>Predicted Start Time:</strong> 10:00 AM
                    </Typography>
                    <Typography>
                        <strong>Start Time:</strong> 10:05 AM
                    </Typography>
                    <Typography>
                        <strong>End Time:</strong> 12:05 PM
                    </Typography>
                    <Typography>
                        <strong>Duration:</strong> 2 hours
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
                                This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> This is a scrollable message section
                                <br /> is this the end?
                                <br /> I hope not
                                <br /> Hahahaha
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

export default CollapsibleModal;
