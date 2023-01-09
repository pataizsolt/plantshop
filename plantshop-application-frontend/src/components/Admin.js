import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <Header />
            <section>
                <Outlet />
            </section>
            <p>admin</p>
        </>
    )
}

export default Admin