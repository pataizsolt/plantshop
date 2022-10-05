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
                navigate('/api/auth/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <div className="container text-left w-50" >
            <table class="table table-s">
                <thead>
                    <tr>
                        <th scope="col" colspan="2">Personal data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>First and last name</td>
                        <td>{userData.firstName} {userData.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>Phone number</td>
                        <td>{userData.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Delivery address</td>
                        <td>{userData.deliveryAddress}</td>
                    </tr>
                    <tr>
                        <td>Delivery address</td>
                        <td>{userData.deliveryAddress}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Profile
