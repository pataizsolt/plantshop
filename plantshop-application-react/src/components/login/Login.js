import { Form, Button, Container } from "react-bootstrap"
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigation } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('');
    const history = useNavigation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: email,
                password: password
            });
            history.push("/dashboard");
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
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Log in
                </Button>
            </Form>
        </Container>
    )
}
