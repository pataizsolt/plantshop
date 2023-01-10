import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Admin = () => {
    const { auth } = useAuth();
    const nav = useNavigate();



    useEffect(() => {
        console.log(auth?.user);








    }, []);

    return (
        <>
            <AdminHeader />
            <section>
                <Outlet />
            </section>
            <p>admin</p>
        </>
    )
}

export default Admin