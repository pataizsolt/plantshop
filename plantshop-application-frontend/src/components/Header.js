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

                {/*
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0  bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto  pb-12 shadow-xl">
                                    <div className="flex px-4 pt-5 pb-2">
                                        <button
                                            type="button"
                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <BsPerson className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>


                                    
                                    {isFetching ? (<div></div>) : (
                                        <Tab.Group as="div" className="mt-2">
                                            <div className="border-b border-gray-200">
                                                <Tab.List className="-mb-px flex space-x-8 px-4">
                                                    {categoriesNavigation1.categories.map((category) => (
                                                        <Tab
                                                            key={category.mainCategory.categoryName}
                                                            className={({ selected }) =>
                                                                classNames(
                                                                    selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                                    'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                                )
                                                            }
                                                        >
                                                            {category.mainCategory.categoryName}
                                                        </Tab>
                                                    ))}
                                                </Tab.List>
                                            </div>
                                            <Tab.Panels as={Fragment}>
                                                {categoriesNavigation1.categories.map((category) => (
                                                    <Tab.Panel key={category.mainCategory.categoryName} className="space-y-10 px-4 pt-10 pb-8">

                                                        <div key={category.mainCategory.categoryName}>
                                                            <p id={`${category.mainCategory.categoryName}-heading-mobile`} className="font-medium text-gray-900">
                                                                <Link to={category.mainCategory.href} className="-m-2 block p-2 text-gray-500">
                                                                    {category.mainCategory.categoryName}
                                                                </Link>
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.mainCategory.categoryName}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {category.subCategories.map((item) => (
                                                                    <li key={item.mainCategory} className="flow-root">
                                                                        <Link to={item.href} className="-m-2 block p-2 text-gray-500">
                                                                            {item.categoryName}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </Tab.Panel>
                                                ))}
                                            </Tab.Panels>
                                        </Tab.Group>



                                    )}



                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                    <span>{page.name}</span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        <div className="flow-root">
                                            <Link to="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                Sign in
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link to="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                Create account
                                            </Link>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            */}
                <header className="relative bg-themebackground1 shadow-2xl ">
                    {/*<p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        asd
                    </p>*/}
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                        <div className="flex h-16 items-center">
                            <div className="mr-auto flex items-center">
                                <div className="p-2 text-themetext1 text-3xl font-bold tracking-tight "><Link to="/home">
                                    <div className="group -m-2 flex items-center p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="36" height="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"> <path d="m8.75 6.75c0 1.25-.75 3-.75 3m.25-2.5s.75-2-1-3.5-4.5-1-4.5-1 0 2 1.5 3.5 4 1 4 1zm.5-1s-.75-2 1-3.5 4.5-1 4.5-1 0 2-1.5 3.5-4 1-4 1z" /> <path d="m4.75 9.75h6.5s.5 4.5-3.25 4.5-3.25-4.5-3.25-4.5z" /> </svg>
                                        <p className='font-bold pl-1'>Indoor gardeners</p></div></Link>
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
                                    <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch ">
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
                                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none text-lg"
                                                                                                    >
                                                                                                        {element.subCategories.map((item) => (
                                                                                                            <li key={item.categoryName} className="flex">
                                                                                                                <Link to={`/store/${item.href}`} className="hover:text-themetext2">
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
