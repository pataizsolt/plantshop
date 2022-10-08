import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const Home = () => {
    return (
        <>
            <Header />
            <section>
                <Outlet />
            </section>
        </>
    )
}

export default Home
