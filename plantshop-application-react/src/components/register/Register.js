import { Form, Button, Container } from "react-bootstrap"
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/registration', {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            });
            navigate.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <Container className="mt-3">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="firstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="lastName" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
