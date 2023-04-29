import {Box, Slide} from "@mui/material";

const sideBar = (props) => {
    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Box
            className="sidebar"
            sx={{
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
                    padding: '16px',
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                }}>
                    <h2 style={{  fontStyle:"italic"}}>{props.name}</h2>
                </Box>
                <Box
                    className="sidebar-body"
                     sx={{padding:"16px", flexGrow:1}}>
                    {props.children}
                </Box>
        </Box>
        </Slide>
    );
}

export default sideBar;