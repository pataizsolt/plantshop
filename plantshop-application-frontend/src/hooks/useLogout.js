
import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const nav = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/api/auth/signout', {
                withCredentials: true
            });

        } catch (err) {
            console.error(err);
            nav("/store");
        }
    }

    return logout;
}

export default useLogout