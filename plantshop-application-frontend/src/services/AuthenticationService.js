import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const signup = (firstName, lastName, email, password) => {
    return axios
        .post(API_URL + "/signup", {
            firstName,
            lastName,
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

            return response.data;
        });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};


const authService = {
    signup,
    login,
    logout,
};

export default authService;