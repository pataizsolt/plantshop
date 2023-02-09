import React from 'react'
import { Link } from 'react-router-dom'
import textData from '../textData'

const LandingPage = () => {
    return (
        <>
            <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{ backgroundPosition: '50%', height: '400px' }}>
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed headerLandingPage" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center text-themetext2 px-6 md:px-12 my-auto">
                            <h1 className="text-5xl font-bold mt-0 mb-6">{textData.pageTitle}</h1>
                            <h3 className="text-3xl font-bold mb-8">{textData.pageSubtitle}</h3>
                            <button type="button" className="mb-10 inline-block px-6 py-2.5 border-4 border-white text-themetext2 font-medium text-lg leading-tight uppercase rounded hover:bg-themebackground1 hover:bg-opacity-50 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                <Link to='/store'>
                                    Get started
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <svg width='100%' height='auto' viewBox='0 0 900 200'>
                <path className=" fill-themebackground3" d="M0 0h900v300H0z" />
                <path className=" fill-themesvg3" d="m0 134 18.8 2.5c18.9 2.5 56.5 7.5 94 16.7 37.5 9.1 74.9 22.5 112.4 17.6 37.5-4.8 75.1-27.8 112.6-28.8s74.9 20 112.4 20.5 75.1-19.5 112.6-30.3c37.5-10.9 74.9-12.5 112.4-9.4 37.5 3.2 75.1 11.2 112.6 13.2s74.9-2 93.5-4l18.7-2V0H0Z" />
                <path className=" fill-themesvg2" d="m0 117 18.8-.3c18.9-.4 56.5-1 94-4.2s74.9-8.8 112.4-4.8c37.5 4 75.1 17.6 112.6 24.5 37.5 6.8 74.9 6.8 112.4-.5 37.5-7.4 75.1-22 112.6-29s74.9-6.4 112.4-6.5c37.5-.2 75.1-1.2 112.6-.9 37.5.4 74.9 2 93.5 2.9l18.7.8V0H0Z" />
                <path className=" fill-themesvg1" d="m0 99 18.8-6.3c18.9-6.4 56.5-19 94-26.7 37.5-7.7 74.9-10.3 112.4-7.2C262.7 62 300.3 71 337.8 80.7c37.5 9.6 74.9 20 112.4 21.8 37.5 1.8 75.1-4.8 112.6-5.3s74.9 5.1 112.4 3.3c37.5-1.8 75.1-11.2 112.6-20.2s74.9-17.6 93.5-22L900 54V0H0Z" />
                <path className=" fill-themebackground1" d="m0 55 18.8-2.3c18.9-2.4 56.5-7 94-8.2 37.5-1.2 74.9 1.2 112.4-1.3s75.1-9.9 112.6-9.5c37.5.3 74.9 8.3 112.4 13.1 37.5 4.9 75.1 6.5 112.6 7.4 37.5.8 74.9.8 112.4 1.8s75.1 3 112.6.2c37.5-2.9 74.9-10.5 93.5-14.4L900 38V0H0Z" />
            </svg>





            <div className="flex min-h-80 items-center justify-center my-auto">
                <div className="w-full max-w-7xl text-center text-2xl text-themetext3 font-semibold">
                    {textData.landingPageText}
                </div>
            </div>
        </>
    )
}

export default LandingPage