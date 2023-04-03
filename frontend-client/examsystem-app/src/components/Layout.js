import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Lsbu from "../assets/Lsbu.svg";
import "./layout.css";


library.add(fas, faUserCircle);
function Header() {
    return (
        <Navbar expand="lg" variant="dark">
            <Navbar.Brand as={Link} to="/">
                <img src={Lsbu} alt="LSBU Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className= "ms-3">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/new-exam">
                        Timer
                    </Nav.Link>
                    <Nav.Link as={Link} to="/exams">
                        Logs
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#">
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
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p>LSBUex. © 2023</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p>
                            Developed by{" "}
                            <a href="examsystem-app/src#" className="text-decoration-none">
                                ServerWzds.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}


function Layout(props) {
    return (
        <div id="layout">
            <Header />
            <main className="flex-fill">{props.children}</main>
            <BackToTop />
            <Footer />
        </div>
    );
}

export default Layout;

