import React from 'react'

const Footer = () => {
    return (
        <>
            <svg width='100%' height='auto' viewBox='0 0 900 300'>
                <path className=" fill-themebackground3" d="M0 0h900v300H0z" />
                <path className=" fill-themesvg3" d="m0 27 11.5 6.5C23 40 46 53 69 70.5s46 39.5 69.2 36.5c23.1-3 46.5-31 69.6-38.2C231 61.7 254 75.3 277 81c23 5.7 46 3.3 69 6.5s46 11.8 69.2 9.3c23.1-2.5 46.5-16.1 69.6-19.1 23.2-3 46.2 4.6 69.2 1.6 23-3 46-16.6 69-19.6s46 4.6 69.2 9.6c23.1 5 46.5 7.4 69.6 8.4 23.2 1 46.2.6 69.2-5.2s46-17.2 57.5-22.8L900 44v257H0Z" />
                <path className=" fill-themesvg2" d="m0 109 11.5 2.3C23 113.7 46 118.3 69 126c23 7.7 46 18.3 69.2 11 23.1-7.3 46.5-32.7 69.6-46 23.2-13.3 46.2-14.7 69.2.3s46 46.4 69 49.7c23 3.3 46-21.3 69.2-34.8 23.1-13.5 46.5-15.9 69.6-13.4C508 95.3 531 102.7 554 108c23 5.3 46 8.7 69 7.5 23-1.2 46-6.8 69.2-13.7 23.1-6.8 46.5-14.8 69.6-14.6 23.2.1 46.2 8.5 69.2 8.1 23-.3 46-9.3 57.5-13.8L900 77v224H0Z" />
                <path className=" fill-themesvg1" d="m0 220 11.5-2.5C23 215 46 210 69 198.3c23-11.6 46-30 69.2-24.6 23.1 5.3 46.5 34.3 69.6 37.8C231 215 254 193 277 185s46-2 69 1.5 46 4.5 69.2-2.7c23.1-7.1 46.5-22.5 69.6-30.1 23.2-7.7 46.2-7.7 69.2 0 23 7.6 46 23 69 36.6 23 13.7 46 25.7 69.2 21.2 23.1-4.5 46.5-25.5 69.6-36.2 23.2-10.6 46.2-11 69.2-15.6 23-4.7 46-13.7 57.5-18.2L900 137v164H0Z" />
                <path className=" fill-themebackground1" d="m0 282 11.5-1.2c11.5-1.1 34.5-3.5 57.5-7.6 23-4.2 46-10.2 69.2-11 23.1-.9 46.5 3.5 69.6 2 23.2-1.5 46.2-8.9 69.2-15.5 23-6.7 46-12.7 69-14.9 23-2.1 46-.5 69.2 6.5 23.1 7 46.5 19.4 69.6 16C508 253 531 234 554 224.2c23-9.9 46-10.5 69 .3s46 33.2 69.2 40.8c23.1 7.7 46.5.7 69.6-.6 23.2-1.4 46.2 3 69.2-3s46-22.4 57.5-30.5L900 223v78H0Z" />
            </svg>

            <div className='relative bg-themebackground1'>

                <footer class="p-4 mx-auto mt-auto max-w-7xl bg-themebackground1 md:flex md:items-center md:justify-between md:p-6" aria-label="Bottom">
                    <span class="text-xl text-themetext1 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">Indoor gardeners™</a>. All Rights Reserved.
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-xl text-themetext1 sm:mt-0">
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Footer