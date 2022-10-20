import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { BsPerson, BsCart } from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import ProfileDropdown from './ProfileDropdown';


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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

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
                                    <Tab.Group as="div" className="mt-2">
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                {navigation.categories.map((category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({ selected }) =>
                                                            classNames(
                                                                selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                                'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>
                                        <Tab.Panels as={Fragment}>
                                            {navigation.categories.map((category) => (
                                                <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                                                    <div className="grid grid-cols-2 gap-x-4">
                                                        {category.featured.map((item) => (
                                                            <div key={item.name} className="group relative text-sm">
                                                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                    <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                                </div>
                                                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                    {item.name}
                                                                </a>
                                                                <p aria-hidden="true" className="mt-1">
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {category.sections.map((section) => (
                                                        <div key={section.name}>
                                                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                                {section.name}
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                className="mt-6 flex flex-col space-y-6"
                                                            >
                                                                {section.items.map((item) => (
                                                                    <li key={item.name} className="flow-root">
                                                                        <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>

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
                                <Popover.Group className="hidden lg:ml-2 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
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
                                                                {category.name}
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
                                                                                {category.sections.map((section) => (
                                                                                    <div key={section.name}>
                                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                            {section.name}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 list-none"
                                                                                        >
                                                                                            {section.items.map((item) => (
                                                                                                <li key={item.name} className="flex">
                                                                                                    <a href={item.href} className="hover:text-gray-800">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
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
                                </Popover.Group>
                            </div>
                        </div>
                    </nav>
                </header >
            </div >
        </>
    );
}

export default Header
