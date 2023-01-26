import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/signup';

const Register = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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


            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            navigate(from, { replace: true });

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
        <>
            <div className="flex h-screen items-center justify-center sm:px-6 lg:px-8 ">
                <div className="w-full max-w-md">
                    <div>
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                            Register your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-t-md border-themetext4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:bg-themebackground4 focus:outline-none focus:ring-themebackground3 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div>
                                <label htmlFor="firstName" className="sr-only">
                                    First name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    required
                                    className="relative block w-full appearance-none rounded-none border-themetext4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:bg-themebackground4 focus:outline-none focus:ring-themebackground3 sm:text-sm"
                                    placeholder="First name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">
                                    Last name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="lastName"
                                    required
                                    className="relative block w-full appearance-none rounded-none border border-themetext4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:bg-themebackground4 focus:outline-none focus:ring-themebackground3 sm:text-sm"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded-none border-themetext4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:bg-themebackground4 focus:outline-none focus:ring-themebackground3 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div>
                                <label htmlFor="match-password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="match-password"
                                    name="match-password"
                                    type="match-password"
                                    required
                                    className="relative block w-full appearance-none rounded-b-md border-themetext4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:bg-themebackground4 focus:outline-none focus:ring-themebackground3 sm:text-sm"
                                    placeholder="Password again"
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    value={matchPassword}
                                />
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="w-full bg-transparent border-themebackground1 hover:bg-themebackground1 hover:text-themetext1 bg-themebackground3 border text-black text-black font-bold py-2 px-4 rounded-lg shadow-lg"

                            >
                                Sign up
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-themebackground1">
                            <p>
                                <p>or</p>
                                <Link to="/store">
                                    <button
                                        type="button"
                                        className="font-medium text-black hover:black"
                                    >
                                        Go back to the store
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
