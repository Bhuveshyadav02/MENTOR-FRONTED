import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import {Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Logo from '../../images/logo3.png';

function Header(props){
    return (
        <Navbar bg="light" expand="lg" style={{padding: "0px"}}>
            <Container>
                <Navbar.Brand><Link to="/teacher/home"><img src={Logo} style={{height: "45px"}} className="logo"></img></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <div className="navs">

                        <Nav className="me-auto">
                            <Nav.Link href="/teacher/home">Home</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Button variant="outline-success" className="logoutBtn" onClick = {() => props.logoutTeacher()}>Logout</Button>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;