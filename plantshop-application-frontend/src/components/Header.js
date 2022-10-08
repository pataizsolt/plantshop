import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Offcanvas, Form, Button, ButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import BsHandbag from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    function isEmpty(anObject) {

        return !Object.keys(anObject ?? {}).length;

    }

    const wrapper = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <div>
                {/* <div className="row-1">
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>Indoor Gardeners</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Item><Link to='/'>Home</Link></Nav.Item>
                                <Nav.Item><Link to='/login'>Login</Link></Nav.Item>
                                <Nav.Item><Link to='/register'>Register</Link></Nav.Item>
                                <Nav.Item><Link to='/private'>Private</Link></Nav.Item>
                                <Nav.Item><Link to='/profile'>Profile</Link></Nav.Item>
                                <Nav.Item><Link to='/home'>Home</Link></Nav.Item>
                                <button className='btn btn-success' onClick={wrapper}>logout</button>
                            </Nav>
                        </Container>
                    </Navbar>
                </div> */}
                <div className="row-2">
                    {['sm'].map((expand) => (
                        <Navbar key={expand} bg="dark" variant="dark" expand={expand}>
                            <Container fluid>
                                <Navbar.Brand as={Link} to="/home">Indoor Gardeners</Navbar.Brand>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-${expand}`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                            Menu
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                            <NavDropdown
                                                menuVariant='dark'
                                                title={<BsPerson />}
                                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                                                as={ButtonGroup}
                                                align={{ lg: 'end' }}
                                            >
                                                {isEmpty(auth) ?
                                                    <>
                                                        <NavDropdown.Item>
                                                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Item>
                                                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                                        </NavDropdown.Item>
                                                    </>
                                                    :
                                                    <>
                                                        <NavDropdown.Item>
                                                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        <NavDropdown.Item>
                                                            <Nav.Link onClick={wrapper}>Logout</Nav.Link>
                                                        </NavDropdown.Item>
                                                    </>
                                                }


                                            </NavDropdown>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Header
