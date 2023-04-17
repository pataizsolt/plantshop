import React from 'react'
import { Popover } from 'react-bootstrap'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MenuItem = ({ categoriesNavigation }) => {
    return (
        <>
            {
                categoriesNavigation.categories.map((catitem) => (
                    catitem.categoryContainers.map((element) => (
                        <Popover key={element.mainCategory.categoryName} className="flex">
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
                                            <div className="absolute inset-0 top-1/2  shadow" aria-hidden="true" />
                                            <div className="relative ">
                                                <div className="mx-auto max-w-7xl px-8">
                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">

                                                            <div key={element.mainCategory.categoryName}>
                                                                <p id={`${element.mainCategory.categoryName}-heading`} className="font-medium text-gray-900">

                                                                    <a href={element.mainCategory.href} className="hover:text-gray-800">
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

                    ))
                ))
            }
        </>
    )
}

export default MenuItem
