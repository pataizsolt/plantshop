import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';

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
    }
    return (
        <>
            <Menu>

            </Menu>
            <Menu as="div" className="relative inline-block text-left ">
                <div>
                    <Menu.Button as="div" className="inline-flex w-full justify-center px-4 py-2 text-xl font-medium">
                        <MdPerson className="h-9 w-9 flex-shrink-0 text-themetext1 group-hover:text-themetext2"
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
                    <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-themebackground2">
                        <div>
                            {isEmpty(auth) ?
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/login"
                                                className={classNames(
                                                    active ? 'bg-themebackground3 text-themetext1' : 'bg-themebackground2 text-themetext1',
                                                    'block px-4 py-2 text-xl'
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
                                                    active ? 'bg-themebackground3 text-themetext1' : 'text-themetext1 bg-themebackground2',
                                                    'block px-4 py-2 text-xl'
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
                                                            active ? 'bg-themebackground3 text-themetext1' : 'text-themetext1 bg-themebackground2',
                                                            'block px-4 py-2 text-xl'
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
                                                    active ? 'bg-themebackground3 text-themetext1' : 'text-themetext1 bg-themebackground2',
                                                    'block px-4 py-2 text-xl'
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
                                                    active ? 'bg-themebackground3 text-themetext1' : 'text-themetext1 bg-themebackground2',
                                                    'block px-4 py-2 text-xl'
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
                                                    active ? 'bg-themebackground3 text-themetext1' : 'text-themetext1 bg-themebackground2',
                                                    'block px-4 py-2 text-xl'
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
