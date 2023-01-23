import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const Home = () => {
    return (
        <>
            <div className='bg-black'>


                <Header />
                <section>
                    <Outlet />
                </section>
            </div>
        </>
    )
}

export default Home
