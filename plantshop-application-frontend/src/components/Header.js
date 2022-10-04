import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item><Link to='/'>Home</Link></Nav.Item>
                    <Nav.Item><Link to='/login'>Login</Link></Nav.Item>
                    <Nav.Item><Link to='/register'>Register</Link></Nav.Item>
                    <Nav.Item><Link to='/private'>Private</Link></Nav.Item>
                    <Nav.Item><Link to="/">Logout</Link></Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
