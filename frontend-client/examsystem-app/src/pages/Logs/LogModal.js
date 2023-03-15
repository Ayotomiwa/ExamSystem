import { useState } from "react";
import {Box, Button, Collapse, Dialog, DialogActions, DialogContent,
    DialogTitle, Typography, IconButton, Paper} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Print, Close } from "@mui/icons-material";


const useStyles = makeStyles((theme) => ({
    modal: {
        width: '50%',
        maxWidth: '50%',
        margin: 'auto',
        backgroundColor: '#ffffff',
        boxShadow: theme.shadows[5],
        borderRadius: '5px',
    },
    title: {
        backgroundColor: '#584595',
        color: '#ffffff',
        alignItems: 'center',
    },
    closeButton: {
        color: '#ffffff',
    },
    content: {
        padding: theme.spacing(2),
    },
    section: {
        marginBottom: theme.spacing(2),
    },
    sectionTitle: {
        color: '#e75480',
        fontWeight: 'bold',
    },
    sectionContent: {
        // color: '#584595',
    },
    actions: {
        backgroundColor: 'yellow',
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    printButton: {
        // color: '#584595',
    },
    submitterInfo: {
        color: '#584595',
        fontStyle: 'italic',
    }
}));

const CollapsibleSection = ({ title, children, classes }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Box marginBottom={2} className={classes.root}>
            <Button
                variant="text"
                onClick={() => setIsOpen(!isOpen)}
                fullWidth
                className={classes.title}
            >
              <Typography variant="h6" className={classes.title}>{title}</Typography>
            </Button>
            <Collapse in={isOpen} className={classes.content}>
                {children}
        </Collapse>
        </Box>
    );
};

const CollapsibleModal = ({ open, handleClose }) => {
    const classes = useStyles();
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
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.modal }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle className={classes.title}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    Modal Title
                    <IconButton edge="end" color="inherit" onClick={handleClose} className={classes.closeButton}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent id="collapsible-modal-content" className={classes.content}>
                <CollapsibleSection title="Module Information"
                                    classes={{
                                        root: classes.section,
                                        title: classes.sectionTitle,
                                        content: classes.sectionContent,
                                    }}
                >
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

                <CollapsibleSection title="Attendance Information"
                                    classes={{
                                        root: classes.section,
                                        title: classes.sectionTitle,
                                        content: classes.sectionContent,
                                    }}
                >
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

                <CollapsibleSection title="Exam Information"
                                    classes={{
                                        root: classes.section,
                                        title: classes.sectionTitle,
                                        content: classes.sectionContent
                                    }}
                >
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
                            <Typography>
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
                            </Typography>
                    </Box>
                </CollapsibleSection>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button color="primary" onClick={printModal} startIcon={<Print />} className={classes.printButton}>
                    Print
                </Button>
                <Typography variant="caption" sx={{ flexGrow: 1, textAlign: "right" }} className={classes.submitterInfo}>
                    Submitted by: Guest
                </Typography>
            </DialogActions>
        </Dialog>
    );
};

export default CollapsibleModal;
