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
import MenuItem from './MenuItem';

const navigation = {
    categories: [
        {
            id: 'plants',
            name: 'Plants',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'genus',
                    name: 'Genus',
                    items: [
                        { name: 'Cactus', href: '#' },
                        { name: 'Ficus', href: '#' },
                        { name: 'Succulent Aloe', href: '#' },
                    ],
                },
                {
                    id: 'plantsize',
                    name: 'Plant size',
                    items: [
                        { name: 'Small', href: '#' },
                        { name: 'Medium', href: '#' },
                        { name: 'Large', href: '#' },
                        { name: 'Extra Large', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'pots',
            name: 'Pots',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'genus',
                    name: 'Genus',
                    items: [
                        { name: 'Cactus', href: '#' },
                        { name: 'Ficus', href: '#' },
                        { name: 'Succulent Aloe', href: '#' },
                    ],
                },
                {
                    id: 'plantsize',
                    name: 'Plant size',
                    items: [
                        { name: 'Small', href: '#' },
                        { name: 'Medium', href: '#' },
                        { name: 'Large', href: '#' },
                        { name: 'Extra Large', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Store', href: '/store' },
        { name: 'random', href: '/profile' },
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
            <div className="bg-white">
                {/* Mobile menu */}
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


                                    {/* Links */}
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
                                                                <a href={category.mainCategory.href} className="-m-2 block p-2 text-gray-500">
                                                                    {category.mainCategory.categoryName}
                                                                </a>
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.mainCategory.categoryName}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {category.subCategories.map((item) => (
                                                                    <li key={item.mainCategory} className="flow-root">
                                                                        <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                            {item.categoryName}
                                                                        </a>
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
                                                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        <div className="flow-root">
                                            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                Sign in
                                            </a>
                                        </div>
                                        <div className="flow-root">
                                            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                Create account
                                            </a>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        asd
                    </p>
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center">
                            <div className="mr-auto flex items-center">
                                <div className="p-2 text-gray-400">Indoor Gardeners</div>
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="ml-4 flow-root lg:ml-6">
                                    <a href="#" className="group -m-2 flex items-center p-2">
                                        <ProfileDropdown />
                                    </a>
                                </div>
                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <a href="#" className="group -m-2 flex items-center p-2">
                                        <BsCart
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </a>
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
                                    <BsPerson className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/*{isFetching ? (<div></div>) : (
                                    <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                        <div className="flex h-full space-x-8">
                                            {categoriesNavigation.categories.array((category) => (
                                                <Popover key={category.mainCategory.categoryName} className="flex">
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative flex">
                                                                <Popover.Button
                                                                    className={classNames(
                                                                        open
                                                                            ? 'border-indigo-600 text-indigo-600'
                                                                            : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                    )}
                                                                >
                                                                    {category.mainCategory.categoryName}
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
                                                                <Popover.Panel className="absolute z-10 inset-x-0 top-full text-sm text-gray-500">
                                                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                                    <div className="relative bg-white">
                                                                        <div className="mx-auto max-w-7xl px-8">
                                                                            <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">

                                                                                    <div key={category.mainCategory.categoryName}>
                                                                                        <p id={`${category.mainCategory.categoryName}-heading`} className="font-medium text-gray-900">

                                                                                            <a href={category.mainCategory.href} className="hover:text-gray-800">
                                                                                                {category.mainCategory.categoryName}
                                                                                            </a>
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${category.mainCategory.categoryName}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none"
                                                                                        >
                                                                                            {category.subCategories.map((item) => (
                                                                                                <li key={item.categoryName} className="flex">
                                                                                                    <a href={item.href} className="hover:text-gray-800">
                                                                                                        {item.categoryName}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                                                            </Popover>



                                            ))}


*/}                                 {isFetching ? (<div></div>) : (
                                    <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                        <div className="flex h-full space-x-8">

                                            {
                                                categoriesNavigation.categories.map((catitem) => (

                                                    <Popover key={catitem.branchCategoryName} className="flex">
                                                        {({ open }) => (
                                                            <>
                                                                <div className="relative flex">
                                                                    <Popover.Button
                                                                        className={classNames(
                                                                            open
                                                                                ? 'border-indigo-600 text-indigo-600'
                                                                                : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
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
                                                                    <Popover.Panel className="absolute z-10 inset-x-0 top-full text-sm text-gray-500">
                                                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                                        <div className="relative bg-white">
                                                                            <div className="mx-auto max-w-7x1 px-8">
                                                                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                    <div className="row-start-1 grid grid-cols-2 gap-y-10 gap-x-8 text-sm">
                                                                                        {
                                                                                            catitem.categoryContainers.map((element) => (
                                                                                                < div key={element.mainCategory.categoryName} >
                                                                                                    <p id={`${element.mainCategory.categoryName}-heading`} className="font-medium text-gray-900">

                                                                                                        <a href={`/store/${element.mainCategory.href}`} className="hover:text-gray-800">
                                                                                                            {element.mainCategory.categoryName}
                                                                                                        </a>
                                                                                                    </p>

                                                                                                    <ul
                                                                                                        role="list"
                                                                                                        aria-labelledby={`${element.mainCategory.categoryName}-heading`}
                                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none"
                                                                                                    >
                                                                                                        {element.subCategories.map((item) => (
                                                                                                            <li key={item.categoryName} className="flex">
                                                                                                                <a href={`/store/${item.href}`} className="hover:text-gray-800">
                                                                                                                    {item.categoryName}
                                                                                                                </a>
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
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                                    >
                                                        {page.name}
                                                    </Link>
                                                ))
                                            }


                                        </div>
                                    </Popover.Group>
                                )}


                                {/* <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {categoriesNavigation.categories.map((category) => (
                                            <Popover key={category.mainCategory.categoryName} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'border-indigo-600 text-indigo-600'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.mainCategory.categoryName}
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
                                                            <Popover.Panel className="absolute z-10 inset-x-0 top-full text-sm text-gray-500">
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">
                                                                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                            <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">

                                                                                <div key={category.mainCategory.categoryName}>
                                                                                    <p id={`${category.mainCategory.categoryName}-heading`} className="font-medium text-gray-900">

                                                                                        <a href={category.mainCategory.href} className="hover:text-gray-800">
                                                                                            {category.mainCategory.categoryName}
                                                                                        </a>
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${category.mainCategory.categoryName}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none"
                                                                                    >
                                                                                        {category.subCategories.map((item) => (
                                                                                            <li key={item.categoryName} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.categoryName}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}


                                        
                                        {navigation.pages.map((page) => (
                                            <Link
                                                key={page.name}
                                                to={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </Link>
                                        ))}


                                    </div>
                                </Popover.Group>*/}
                            </div>
                        </div>
                    </nav>
                </header >
            </div >
        </>
    );
}

export default Header
