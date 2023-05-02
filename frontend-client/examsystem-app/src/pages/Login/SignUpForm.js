import {useContext, useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {FaEnvelope, FaLock, FaSignInAlt, FaUserPlus} from "react-icons/fa";
import AuthHandler from "../../components/AuthHandler";
import {Box, InputAdornment} from "@mui/material";

const SignUp = ({ show, setLogin, setSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { login } = useContext(AuthHandler);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleLogin = () => {
        setSignUp(false);
        setLogin(true);
        console.log("Login");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
        } else {
            console.log("Signup Successful!");
        }
        createUser();
    };

    const createUser = () => {
        fetch("http://localhost:8080/api/user/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(r => r.json())
        .then(data => {
            login({ username: data.username, token: data.token })
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
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

    function closeSignUp() {
        setSignUp(false);
        console.log("Close Sign Up");
    }

    return (
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
    );
};

export default SignUp;
