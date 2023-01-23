import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/user/profile', {

                });

                setUserData(response.data);
                console.log(userData);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-10 inline-block">
                <div className="overflow-hidden shadow-xl">
                    <table className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2 bg-themebackground4 rounded-lg ">
                        <thead className="">
                            <tr>
                                <th scope="col" className="text-xl font-medium text-black px-6 py-4 text-left" colSpan="2">
                                    Personal data
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-black">First and last name</td>
                                <td className="text-xl text-black  px-6 py-4 whitespace-nowrap">{userData.firstName} {userData.lastName}</td>
                            </tr>
                            <tr className="">
                                <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-black">Email</td>
                                <td className="text-xl text-black  px-6 py-4 whitespace-nowrap">{userData.email}</td>
                            </tr>
                            <tr className=" ">
                                <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-black">Phone number</td>
                                <td className="text-xl text-black  px-6 py-4 whitespace-nowrap">{userData.phoneNumber}</td>
                            </tr>
                            {/*<tr className=" border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delivery address</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{userData.deliveryAddress}</td>
                            </tr>
                            <tr className=" border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Billing address</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{userData.billingAddress}</td>
                        </tr>*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Profile
