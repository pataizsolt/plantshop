import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'


const Home = () => {
    return (
        <>
            <div className=''>


                <Header />
                <body className='flex flex-col min-h-screen bg-themebackground3'>
                    <Outlet />
                </body>
                <Footer />


            </div>
        </>
    )
}

export default Home
