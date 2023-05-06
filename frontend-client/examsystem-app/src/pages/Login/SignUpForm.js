import React, {useContext, useEffect, useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {FaEnvelope, FaLock, FaSignInAlt, FaUserPlus} from "react-icons/fa";
import AuthHandler from "../../components/AuthHandler";
import {Box, InputAdornment} from "@mui/material";
import ConfirmModal from "../../components/ConfirmModal";
import confirmModal from "../../components/ConfirmModal";

const SignUp = ({ show, setLogin, setSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");
    const [statusModal, setStatusModal] = useState(false);
    const [firstRender, setFirstRender] = useState(true);


    useEffect(() => {

        if (firstRender) {
            setFirstRender(false);
            return;
        }

        if (signUpMessage === "Sign Up Successful") {
            setTimeout(() => {
                setLogin(true);
                setStatusModal(false);
            }, 1000);

        }
        else if (signUpMessage !== ""){
            setSignUp(false);
            setTimeout(() => {
                setSignUp(true);
                setStatusModal(false);
                setSignUpMessage("");
            }, 600);

        }
    }, [signUpMessage, statusModal]);




    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.endsWith("@lsbu.ac.uk")) {
            setSignUpMessage("Email must end with @lsbu.ac.uk");
            setStatusModal(true);
        } else if (password !== confirmPassword) {
            setSignUpMessage("Passwords do not match!");
            setStatusModal(true);
        } else {
            createUser();
            setPassword("");
            setConfirmPassword("");
            setEmail("");
        }
    };


    const createUser = () => {
        fetch("https://lsbu-ex-timer.herokuapp.com/api/user/sign-up", {
        // fetch("http://localhost:8080/api/user/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(r => {
            if(r.ok){
                successfulSignUp();
            }
            return r.json();
        }).catch(err => {
            console.log(err);
           invalidSignUp(err);
        })
    }

    function closeSignUp() {
        setSignUp(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSignUpMessage("");
        console.log("Close Sign Up");
    }

    const handleLogin = () => {
        setSignUp(false);
        setLogin(true);
        console.log("Login");
    }

    const successfulSignUp = () => {
        setSignUp(false);
        setSignUpMessage("Sign Up Successful");
        setStatusModal(true);
    }


    const invalidSignUp = (error) => {
        setSignUpMessage("Sign Up Failed, " + error.message);
        setStatusModal(true);
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
            <Modal show={show} onHide={closeSignUp} className="signup-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
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
                            InputProps={{ startAdornment: (
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
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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
                        <Button variant="contained" onClick={handleLogin} className="login-button">
                            <FaSignInAlt /> Back To Login
                        </Button>
                        <Button variant="contained" type="submit"  className="signup-button">
                            <FaUserPlus /> Sign Up
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </ThemeProvider>
            <ConfirmModal
                open={statusModal}
                handleClose={() => setStatusModal(false)}
                title={'Sign Up'}
                content={
                    signUpMessage
                }
            />
        </>
    );
};

export default SignUp;
