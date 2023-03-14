import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas, faUserCircle} from "@fortawesome/free-solid-svg-icons";

import "./style.css";


function Header() {
    return (
        <Navbar// bg="dark"
            expand="lg"
        >
            <Navbar.Brand as={Link} to="/">LSBU </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"  />
            <Navbar.Collapse id="navbar-nav" bg="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" >
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/timer" >
                        Timer
                    </Nav.Link>
                    <Nav.Link as={Link} to="/newexam">
                        Logs
                    </Nav.Link>
                </Nav>
                <Nav className="options ms-auto" >
                    <Nav.Link href="#" >
                        <span>Settings</span>
                    </Nav.Link>
                    <Nav.Link href="#" >
                        <FontAwesomeIcon icon={faUserCircle} className="my-icon" />
                    </Nav.Link>
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
                <div className="row my-sm-0">
                    <div className="col-md-6">
                        <div className="footer-left">
                            <p>LSBUex. © 2023</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="footer-right">
                            <p>
                                Developed by <a href="#">ServerWzds.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function Layout(props) {
    return (
        <div>
            <Header />
            <main className="flex-fill">{props.children}</main>
            <BackToTop />
            <Footer />
        </div>
    );
}

export default Layout;

