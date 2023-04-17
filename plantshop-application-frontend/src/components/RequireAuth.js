import App from "../App";
import useLoginStatus from "../hooks/useLoginStatus";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
    const userIsLoggedIn = useLoginStatus(); // Your hook to get login status
    const nav = useNavigate();
    const data = "You need to log in to acces this site";

    if (!userIsLoggedIn) {
        return <Navigate to="/login" state={{ data }} />;
    }
    return children;
};


