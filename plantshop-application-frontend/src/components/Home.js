import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import Header from './Header'


const Home = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    const wrapper = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <Header />
            <button className='btn btn-success' onClick={wrapper}>logout</button>
            <section>
                <Outlet />
            </section>
        </>
    )
}

export default Home
