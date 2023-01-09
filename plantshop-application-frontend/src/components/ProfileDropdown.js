import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileDropdown() {
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
    return (
        <>
            <Menu>

            </Menu>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button as="div" className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium">
                        <BsPerson className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {isEmpty(auth) ?
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/login"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Sign in
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/register"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Sign up
                                            </Link>
                                        )}
                                    </Menu.Item>

                                </>
                                :
                                <>
                                    {auth.roles[0].authority === 'ADMIN' ?
                                        (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/admin"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Admin
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )
                                        :
                                        (
                                            <div></div>
                                        )
                                    }
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/profile"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/orders"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Orders
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={wrapper}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Log out
                                            </a>
                                        )}
                                    </Menu.Item>
                                </>
                            }


                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
