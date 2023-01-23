import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { BsPerson, BsCart, BsMenuButton, BsMenuApp } from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import AdminProfileDropdown from './AdminProfileDropdown';
import { useEffect } from 'react';
import axios from '../api/axios';
import { MdMenu } from 'react-icons/md';


const navigation = {
    pages: [
        { name: 'Category list', href: '/admin/categorymanager' },
        { name: 'Category Manager', href: '/admin/branchcategorymanager' },
        { name: 'Product Manager', href: '/admin/productmanager' },
        { name: 'Order Manager', href: '/admin/ordermanager' }
    ],
}

const categoriesNavigation1 = {
    "categories": [
        {
            "mainCategory": {
                "id": 5,
                "categoryName": "Category2",
                "href": "category2",
                "parentId": null
            },
            "subCategories": []
        },
        {
            "mainCategory": {
                "id": 4,
                "categoryName": "Category1",
                "href": "category1",
                "parentId": null
            },
            "subCategories": [
                {
                    "id": 6,
                    "categoryName": "SubCategory1",
                    "href": "scategory1",
                    "parentId": 4
                },
                {
                    "id": 7,
                    "categoryName": "SubCategory2",
                    "href": "scategory2",
                    "parentId": 4
                }
            ]
        }
    ]
}






function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AdminHeader = () => {
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
            <div className="bg-white">
                {/* Mobile menu 
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
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
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
                </Transition.Root>*/}

                <header className="relative bg-white">
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center">
                            <div className="mr-auto flex items-center">
                                <div className="p-2 text-gray-400"><Link to="/">Indoor Gardeners</Link></div>
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="#" className="group -m-2 flex items-center p-2">
                                        <AdminProfileDropdown />
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </nav>
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center justify-center">
                                <button
                                    type="button"
                                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MdMenu className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">


                                        {
                                            navigation.pages.map((page) => (

                                                <Link
                                                    key={page.name}
                                                    to={page.href}
                                                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                                >
                                                    {page.name}
                                                </Link>
                                            ))
                                        }


                                    </div>
                                </Popover.Group>

                            </div>
                        </div>
                    </nav>
                </header >
            </div >
        </>
    );
}

export default AdminHeader
