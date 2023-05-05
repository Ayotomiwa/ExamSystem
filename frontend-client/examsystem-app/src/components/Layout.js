import React, {useContext, useEffect, useState} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import{useLocation} from "react-router-dom";
import Lsbu from "../assets/Lsbu.svg";
import "./layout.css";
import AuthHandler from "./AuthHandler";
import {Button, Fade, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";


library.add(fas, faUserCircle);


function Header({account, setLogin}) {
    const { user } = useContext(AuthHandler);
    const { logout } = useContext(AuthHandler);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignIn = () => {
        setLogin(true);
        handleClose();
    };

    const handleSignOut = () => {
        logout();
        handleClose();
    };


    return (<Navbar expand="lg" >
            <Navbar.Brand as={Link} to="/">
                <img src={Lsbu} alt="LSBU LsbuLogo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-3">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/new-exam">
                        Timer
                    </Nav.Link>
                    <Nav.Link as={Link} to="/exams">
                        Logs
                    </Nav.Link>
                    <div style={{marginLeft:"45em"}}> </div>
                    <NavDropdown
                        title={<span className="text-warning">{account}</span>}
                        id="account-dropdown"
                    >
                        {user ? (
                            <NavDropdown.Item  onClick={handleSignOut} style={{
                                display: "block",
                                textAlign: "center",
                                border: "none",
                                padding: "0px",
                                margin:"auto",
                                color:"#584595" }}>Sign Out</NavDropdown.Item>
                        ) : (
                            <NavDropdown.Item  onClick={handleSignIn} style={{
                                display: "block",
                                textAlign: "center",
                                border: "none",
                                padding: "0px",
                                margin:"auto",
                                color:"#584595"
                                 }}>Sign In</NavDropdown.Item>
                        )}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function BackToTop() {
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <a className="back-to-top" onClick={handleBackToTop}>
            Back To The Top
        </a>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p>LSBUex. © 2023</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p>
                            Developed by{" "}
                            <a href="examsystem-app/src#" className="text-decoration-none">
                                ServerWzd.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}


function Layout({children, timerMode, setLogin}) {
    const location = useLocation().pathname;
    const [account, setAccount] = useState("Guest");
    const { user } = useContext(AuthHandler);

    useEffect(() => {
        if (user) {
            setAccount(user.username);
        } else {
            setAccount("Guest");
        }
    }, [user]);

    return (
        <div id="layout">
            {timerMode && <Header account={account} setLogin={setLogin}/>}
            <main className="flex-fill">{children}</main>
            {(location !== "/new-exam") && <BackToTop />}
            {timerMode && <Footer />}
        </div>
    );
}

export default Layout;

