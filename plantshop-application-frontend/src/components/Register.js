import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import authService from '../services/AuthenticationService'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.signup(firstName, lastName, email, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="firstName" placeholder="Enter email" onChange={(e) => setFirstName(e.target.value)}
                    value={firstName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastName" placeholder="Enter email" onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                    value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Register
