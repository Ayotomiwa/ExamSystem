import {useContext, useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./loginForm.css";
import AuthHandler from "../../components/AuthHandler";
import {Box, InputAdornment} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";

const LoginForm = ({ show, setLogin, setSignUp, nextPage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthHandler);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
            handleLogin();
    };


    const handleLogin = () => {
        fetch(`http://localhost:8080/api/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                username: email,
                password: password,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                if (data.token) {
                    console.log("Login Success!");
                    login({ username: data.username, token: data.token });
                    console.log("data.username: ", data.username);
                    console.log("data.token: ", data.token);
                    setLogin(false);
                    window.location.href = nextPage;
                    } else {
                        console.log("Login Failed!");
    }
    }).catch((error) => console.error(error));
    };

    const handleSignUp = () => {
        setLogin(false);
        setSignUp(true);
        console.log("Sign Up");
    };

    const closeLogin = () => {
        setLogin(false);
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
                            fullWidth = {true}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box>
                                            <FaEnvelope />
                                        </Box>
                                    </InputAdornment>
                                ),
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
                            fullWidth = {true}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box>
                                            <FaLock />
                                        </Box>
                                    </InputAdornment>
                                ),
                                className: "input-field",
                            }}
                            sx={{ mb: 2 }}
                        />
                        <div className="d-flex justify-content-between">
                        <Button variant="contained" type="submit"  className="login-button">
                            <FaSignInAlt /> Login
                        </Button>
                        <Button variant="outlined" color="secondary"  onClick={handleSignUp} className="signup-button">
                            <FaUserPlus /> Sign Up
                        </Button>
                        </div>
                        <Button variant="outlined" color="secondary" onClick={handleSignUp} className="forgot-password">
                            Forgot password?
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </ThemeProvider>
    );
};

export default LoginForm;

