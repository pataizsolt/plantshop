import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from '../api/axios'

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/signup';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);


    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPassword])



    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            console.log(errMsg)
            console.log(v1)
            console.log(v2)
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName, lastName, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }


    return (


        < div className="container text-center" >

            <main className="form-signin w-50 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="firstName" className="form-control" id="floatingFirstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <label htmlFor="floatingFirstName">First Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="lastName" className="form-control" id="floatingLastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <label htmlFor="floatingLastName">Last Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="matchPassword" className="form-control" id="floatingMatchPassword" onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} />
                        <label htmlFor="floatingMatchPassword">Password</label>
                    </div>

                    <button disabled={!validEmail || !validPassword || !validMatch ? true : false} className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                </form>
            </main>

        </div>
    )
}

export default Register
