import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./loginForm.css";

const Login = ({ show, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email.endsWith("@lsbu.as.uk")) {
            console.log("Login Successful!");
        } else {
            console.log("Invalid Email!");
        }
    };

    const handleSignUp = () => {
        handleClose();
        console.log("Sign Up");
    };

    const closeLogin = () => {
        handleClose();
        console.log("Close Login");
    }

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

    return (
        <ThemeProvider theme={theme}>
            <Modal show={show} onHide={closeLogin} className="login-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <FaEnvelope />,
                                className: "input-field",
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <FaLock />,
                                className: "input-field",
                            }}
                            sx={{ mb: 2 }}
                        />
                        <div className="d-flex justify-content-between">
                        <Button variant="contained" type="submit" fullWidth className="login-button">
                            <FaSignInAlt /> Login
                        </Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleSignUp} className="signup-button">
                            <FaUserPlus /> Sign Up
                        </Button>
                        </div>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleSignUp} className="forgot-password">
                            Forgot password?
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </ThemeProvider>
    );
};

export default Login;

