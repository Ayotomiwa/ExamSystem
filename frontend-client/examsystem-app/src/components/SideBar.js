import {Box} from "@mui/material";

const sideBar = (props) => {
    return (
        <Box
            className="sidebar"
            sx={{
                height:"100%",
                width: "35%",
                boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                position:'relative'
            }}>
                <Box className="sidebar-brand"
                    sx={{
                    padding: '16px',
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                }}>
                    <h2>{props.name}</h2>
                </Box>
                <Box
                    className="sidebar-body"
                     sx={{padding:"16px", flexGrow:1}}>
                    {props.children}
                </Box>
        </Box>
    );
}

export default sideBar;