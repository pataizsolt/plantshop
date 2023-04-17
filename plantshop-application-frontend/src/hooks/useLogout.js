
import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const useLogout = () => {
    const { setAuth } = useAuth();
    const nav = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/api/auth/signout', {
                withCredentials: true
            });
            nav("/store");
            toast.success("Logged out", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            console.error(err);
            nav("/store");
        }
    }

    return logout;
}

export default useLogout