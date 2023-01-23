import React from 'react'

const Footer = () => {
    return (
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
    )
}

export default Footer