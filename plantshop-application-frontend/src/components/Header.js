import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { BsPerson, BsCart } from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import ProfileDropdown from './ProfileDropdown';
import { useEffect } from 'react';
import axios from '../api/axios';
import { MdOutlineShoppingBasket, MdShoppingBasket, MdShoppingCart } from 'react-icons/md';
import textData from '../textData';


const navigation = {
    pages: [
        { name: 'Store', href: '/store' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    const [categoriesNavigation, setCategoriesNavigation] = useState();
    const [isFetching, setIsFetching] = useState(true);


    useEffect(() => {
        axios.get('/api/store/categories').then(resp => {
            console.log(resp.data)



            setCategoriesNavigation(resp.data)
            setIsFetching(false);
            console.log(categoriesNavigation);
        });
    }, [])

    function isEmpty(anObject) {

        return !Object.keys(anObject ?? {}).length;

    }

    const wrapper = () => {
        logout();
        navigate('/login');
    }

    const [open, setOpen] = useState(false)


    return (
        <>
            <div>


                <header className="relative bg-themebackground1 shadow-2xl ">
                    <p className="flex h-auto py-2 items-center justify-center bg-themebackground2 px-4 text-lg font-medium text-themetext2 sm:px-6 lg:px-8">
                        {textData.banner}
                    </p>
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                        <div className="flex h-16 items-center">
                            <div className="mr-auto flex items-center">
                                <div className="p-2 text-themetext1 text-3xl font-bold tracking-tight "><Link to="/home">
                                    <div className="group -m-2 flex items-center p-2">
                                        <div dangerouslySetInnerHTML={{ __html: textData.svgicon }} />
                                        <p className='font-bold pl-1'>{textData.websiteDomain}</p></div></Link>
                                </div>
                            </div>
                            <div className="ml-auto flex items-center ">
                                <div className="ml-4 flow-root lg:ml-6" >
                                    <Link to="#" className="group -m-2 flex items-center p-2">
                                        <ProfileDropdown />
                                    </Link>
                                </div>

                                <div className="ml-4 flow-root lg:ml-6 ">
                                    <Link to="/shoppingbasket" className="group -m-2 flex items-center p-2">
                                        <MdShoppingCart
                                            className="h-9 w-9 flex-shrink-0 text-themetext1 group-hover:text-themetext2"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                        <div className="">
                            <div className="flex h-16 items-center justify-center">
                                {/* Cart 
                                <button
                                    type="button"
                                    className="rounded-md  p-2 text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <BsPerson className="h-6 w-6" aria-hidden="true" />
                                </button>*/}
                                {isFetching ? (<div></div>) : (
                                    <Popover.Group className="lg:ml-2 lg:block lg:self-stretch ">
                                        <div className="flex h-full space-x-8 ">

                                            {
                                                categoriesNavigation.categories.map((catitem) => (

                                                    <Popover key={catitem.branchCategoryName} className="flex ">
                                                        {({ open }) => (
                                                            <>
                                                                <div className="relative flex ">
                                                                    <Popover.Button
                                                                        className={classNames(
                                                                            open
                                                                                ? 'border-themetext-1 text-themetext1'
                                                                                : 'border-transparent text-themetext1 hover:text-themetext2',
                                                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-xl font-medium transition-colors duration-200 ease-out'
                                                                        )}
                                                                    >
                                                                        {catitem.branchCategoryName}
                                                                    </Popover.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-200"
                                                                    enterFrom="opacity-0"
                                                                    enterTo="opacity-100"
                                                                    leave="transition ease-in duration-150"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Popover.Panel className="absolute z-10 inset-x-0 top-full  text-themetext1 bg-themebackground2">
                                                                        <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />
                                                                        <div className="relative">
                                                                            <div className="mx-auto max-w-7x1 px-8">
                                                                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                    <div className="row-start-1 grid grid-cols-2 gap-y-10 gap-x-8 text-xl">
                                                                                        {
                                                                                            catitem.categoryContainers.map((element) => (
                                                                                                < div key={element.mainCategory.categoryName} >
                                                                                                    <p id={`${element.mainCategory.categoryName}-heading`} className="text-themetext1">

                                                                                                        <Link to={`/store/${element.mainCategory.href}`} className="hover:text-themetext2">
                                                                                                            {element.mainCategory.categoryName}
                                                                                                        </Link>
                                                                                                    </p>

                                                                                                    <ul
                                                                                                        role="list"
                                                                                                        aria-labelledby={`${element.mainCategory.categoryName}-heading`}
                                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none text-lg "
                                                                                                    >
                                                                                                        {element.subCategories.map((item) => (
                                                                                                            <li key={item.categoryName} className="flex">
                                                                                                                <Link to={`/store/${item.href}`} className="hover:text-themetext2 text-sm">
                                                                                                                    {item.categoryName}
                                                                                                                </Link>
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </ul>
                                                                                                </div>


                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Popover.Panel>
                                                                </Transition>
                                                            </>
                                                        )}
                                                    </Popover>


                                                ))
                                            }
                                            {
                                                navigation.pages.map((page) => (

                                                    <Link
                                                        key={page.name}
                                                        to={page.href}
                                                        className="flex items-center font-medium text-xl text-themetext1 hover:text-themetext2"
                                                    >
                                                        {page.name}
                                                    </Link>
                                                ))
                                            }


                                        </div>
                                    </Popover.Group>
                                )}
                            </div>
                        </div>
                    </nav>
                </header >
            </div >
        </>
    );
}

export default Header
