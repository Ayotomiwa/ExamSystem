import {Box, IconButton, Slide} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const sideBar = ({onCancel, name, children}) => {
    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Box
            className="sidebar"
            sx={{
                margin:"auto",
                height:"100%",
                color: "#584595",
                width: "35vw",
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
            }}>
                <Box className="sidebar-brand"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    padding: '16px',
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                }}>
                    <h2 style={{  fontStyle:"italic"}}>{name}</h2>
                    <IconButton edge="end" color="inherit" onClick={onCancel}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    className="sidebar-body"
                     sx={{padding:"16px", flexGrow:1}}>
                    {children}
                </Box>
        </Box>
        </Slide>
    );
}

export default sideBar;