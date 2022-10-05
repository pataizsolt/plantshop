import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const Header = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const wrapper = () => {
        logout();
        navigate('/login');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item><Link to='/'>Home</Link></Nav.Item>
                    <Nav.Item><Link to='/login'>Login</Link></Nav.Item>
                    <Nav.Item><Link to='/register'>Register</Link></Nav.Item>
                    <Nav.Item><Link to='/private'>Private</Link></Nav.Item>
                    <Nav.Item><Link to='/profile'>Profile</Link></Nav.Item>
                    <button className='btn btn-success' onClick={wrapper}>logout</button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
