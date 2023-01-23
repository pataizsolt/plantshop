import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './Footer'

const Admin = () => {
    const { auth } = useAuth();
    const nav = useNavigate();

    return (
        <>

            <AdminHeader />
            <section className='flex flex-col min-h-screen'>
                <Outlet />
            </section>
            <Footer />

        </>
    )
}

export default Admin