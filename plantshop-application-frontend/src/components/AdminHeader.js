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
import textData from '../textData';


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
            <div className="">


                <header className="relative bg-themebackground1 shadow-2xl">
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center">
                            <div className="p-2 text-themetext1 text-3xl font-bold tracking-tight "><Link to="/home">
                                <div className="group -m-2 flex items-center p-2">
                                    <div dangerouslySetInnerHTML={{ __html: textData.svgicon }} />
                                    <p className='font-bold pl-1'>{textData.websiteDomain} admin</p></div></Link>
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="ml-4 flow-root lg:ml-6" >
                                    <Link to="#" className="group -m-2 flex items-center p-2">
                                        <AdminProfileDropdown />
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </nav>
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="">
                            <div className="flex h-16 items-center justify-center">
                                {/*<button
                                    type="button"
                                    className="rounded-md  p-2 text-themetext1 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MdMenu className="h-6 w-6" aria-hidden="true" />
                                </button>*/}

                                <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">


                                        {
                                            navigation.pages.map((page) => (

                                                <Link
                                                    key={page.name}
                                                    to={page.href}
                                                    className="flex items-center text-xl font-medium text-themetext1 hover:text-gray-800"
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
