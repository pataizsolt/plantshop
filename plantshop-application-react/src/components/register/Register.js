import { Form, Button } from "react-bootstrap"
import React, { useState } from 'react'

export default function Register() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')

    const handleClick=(e) =>{
        e.preventDefault()
        const user={email,password,firstName,lastName}
        console.log(user)
        fetch("http://localhost:8080/api/v1/registration",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>
        {
            console.log("new user added")
        })
    }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>Password</Form.Label>
        <Form.Control type="firstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Password</Form.Label>
        <Form.Control type="lastName" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Submit
      </Button>
    </Form>
  )
}
