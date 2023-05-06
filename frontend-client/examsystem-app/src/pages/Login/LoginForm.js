import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./loginForm.css";
import AuthHandler from "../../components/AuthHandler";
import {Box, InputAdornment} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";

const LoginForm = ({ show, setLoginModal, setSignUp}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthHandler);
    const[loginMessage, setLoginMessage] = useState("");
    const[statusModal, setStatusModal] = useState(false);


    //
    // useEffect(() => {
    //     if (show) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }
    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    // }, [show, statusModal]);
    //


    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    // useEffect(() => {
    //     if(loginMessage === "Login Successful"){
    //         // setLoginModal(false);
    //
    //
    //     }
    // }, [loginMessage, statusModal, setLoginModal]);


    const handleLogin = () => {
        fetch(`https://lsbu-ex-timer.herokuapp.com/api/authenticate`, {
        // fetch(`http://localhost:8080/api/authenticate`, {
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
                if (data.token) {
                    login({ username: data.username, token: data.token });
                    setLoginMessage("Login Successful - Welcome " + data.username);
                    reloadPage();
                    }
                setEmail("");
                setPassword("");
    }).catch((error) => {
        console.error(error)
            setLoginMessage("Error: Login Failed - " + error.message);
            setStatusModal(true);
        });
    };


    const reloadPage = () => {
        setLoginModal(false);
        setStatusModal(true);
        setTimeout(() => {
            setStatusModal(false);
            window.location.reload();
            setLoginMessage("");
        }, 1200);
    }



    const handleSignUp = () => {
        setLoginModal(false);
        setSignUp(true);
        console.log("Sign Up");
    };

    const closeLogin = () => {
        setLoginModal(false);
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
        <>
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
                            onChange={(event) => setEmail(event.target.value)}
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
                            onChange={(event) => setPassword(event.target.value)}
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
            <ConfirmModal
        open={statusModal}
        handleClose={() => setStatusModal(false)}
        title={'Login'}
        content={
            loginMessage
        }
    />
    </>
    );
};

export default LoginForm;

