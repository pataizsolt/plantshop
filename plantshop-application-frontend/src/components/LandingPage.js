import React from 'react'
import flowers from '../assets/flowers.jpg'
import garden from '../assets/garden.jpg'
import japangarden from '../assets/japangarden.jpg'
import { Carousel, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <>
            <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{ backgroundPosition: '50%', height: '350px' }}>
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed headerLandingPage" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center text-themetext5 px-6 md:px-12">
                            <h1 className="text-5xl font-bold mt-0 mb-6">From soil to soul, gardening nourishes.</h1>
                            <h3 className="text-3xl font-bold mb-8">Let your journey begin</h3>
                            <button type="button" className="mb-10 inline-block px-6 py-2.5 border-4 border-white text-themetext2 font-medium text-lg leading-tight uppercase rounded hover:bg-themebackground1 hover:bg-opacity-50 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                <Link to='/store'>
                                    Get started
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='layer2 spacer'></div>

            <div className="flex min-h-80 items-center justify-center">
                <div className="w-full max-w-7xl text-center text-2xl font-semibold">
                    Welcome to our indoor gardening webshop! We believe that gardening is not just about growing plants, but it's also about nurturing the soul. Our motto, "From soil to soul, gardening nourishes," reflects this belief. We have a wide range of indoor gardening products, from soil to seeds, pots to planters, and everything in between. Whether you are a seasoned gardener or just starting out, we have something for you. Be sure to check out our webshop, where you can find a wide range of products to help you on your gardening journey. Thank you for choosing us, and happy gardening!
                </div>
            </div>
            {/*
            <div className='layer3 spacer'></div>
            
            <div className="container max-w- bg-themebackground1">
                <div className="text-center text-themetext5 px-6 md:px-12">
                    <p className="text-lg font-bold mt-0 mb-6">
                        Welcome to our indoor gardening webshop! We are dedicated to helping you bring the beauty of nature into your home. Whether you're a seasoned indoor gardener or just starting out, we have everything you need to create a lush, thriving indoor oasis.

                        Our webshop offers a wide selection of indoor gardening supplies, including pots, planters, soil, fertilizers, and a variety of easy-to-grow indoor plants. We also have a range of high-quality indoor gardening tools and equipment to help you maintain your indoor garden.

                        In addition to our product selection, we also offer a wealth of information and resources on indoor gardening, including tips on how to care for your plants, design ideas for creating the perfect indoor oasis, and advice on how to select the right plants for your home.

                        So whether you're looking to create a green corner in your living room or turn your whole house into a jungle, we are here to help you every step of the way. Browse our webshop now and start building your indoor garden today!
                    </p>


                </div>
    </div>
    <div className='layer4 spacer'></div>*/}
        </>
    )
}

export default LandingPage