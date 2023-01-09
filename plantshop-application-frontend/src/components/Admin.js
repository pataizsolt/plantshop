import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const Admin = () => {
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