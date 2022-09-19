import React, { useState } from 'react'

export default function User() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const handleClick=(e) =>{
        e.preventDefault()
        const user={email,password}
        console.log(user)
        fetch("http://localhost:8080/user/save",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>
        {
            console.log("new user added")
        })
    }
  return (
    <form>
        <input type="text" id="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" id="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit' onClick={handleClick}>Submit</button>
    </form>
  )
}
