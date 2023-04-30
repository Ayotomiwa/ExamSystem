import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    createTheme, IconButton,

} from '@mui/material';
import {ThemeProvider} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";


const ConfirmModal = ({ open, handleClose, handleYes, handleNo, title, content, showYesAndNo }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#584595",
            },
            secondary: {
                main: "#e75480",
            },
        },
    });


    const handleOk = () => {
        handleClose();
    };


    return (
        <ThemeProvider theme={theme}>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{ backgroundColor: theme.palette.primary.main }}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize:"20px"}}>
                    {title}
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                </div>
            </DialogTitle>
            <DialogContent sx={{width: "500px"}}>
                <DialogContentText sx={{ display: "grid", placeItems:"center", fontSize: "1.4rem", fontWeight: "medium", pt:"16px" }}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {showYesAndNo && (
                    <div >
                        <Button onClick={handleNo} variant="outlined" color="primary" sx={{mr:"20px"}}>
                            No
                        </Button>
                        <Button onClick={handleYes} variant="contained" color="secondary" autoFocus>
                            Yes
                        </Button>
                    </div>
                )}
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    );
};

export default ConfirmModal;

