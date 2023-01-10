import App from "../App";
import useLoginStatus from "../hooks/useLoginStatus";
import Login from "./Login";

export const RequireAuth = ({ children }) => {
    const userIsLogged = useLoginStatus(); // Your hook to get login status

    if (!userIsLogged) {
        return <Login />;
    }
    return children;
};


