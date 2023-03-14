import React, { useState } from "react";
import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import { Print, Close } from "@mui/icons-material";

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box marginBottom={2}>
            <Button
                variant="text"
                onClick={() => setIsOpen(!isOpen)}
                fullWidth
                startIcon={<Typography variant="h6">{title}</Typography>}
            >
                {isOpen ? "Hide" : "Show"}
            </Button>
            <Collapse in={isOpen}>{children}</Collapse>
        </Box>
    );
};

const CollapsibleModal = ({ open, handleClose }) => {
    const printModal = () => {
        // Implement print functionality
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="collapsible-modal-title"
        >
            <DialogTitle id="collapsible-modal-title">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    Modal Title
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <CollapsibleSection title="Module Information">
                    <Typography>
                        <strong>Module Name:</strong> Example Module Name
                    </Typography>
                    <Typography>
                        <strong>Module Code:</strong> EXM123
                    </Typography>
                    <Typography>
                        <strong>Module Leader:</strong> John Doe
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
                    <Box
                        component={Paper}
                        maxHeight={100}
                        overflow="auto"
                        padding={1}
                        marginTop={1}
                    >
                        <Typography>
                            <strong>Message:</strong> This is a scrollable message section.
                        </Typography>
                    </Box>
                </CollapsibleSection>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={printModal} startIcon={<Print />}>
                    Print
                </Button>
                <Typography variant="caption" sx={{ flexGrow: 1, textAlign: "right" }}>
                    Submitted by: Jane Smith
                </Typography>
            </DialogActions>
        </Dialog>
    );
};

export default CollapsibleModal;
