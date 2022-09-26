import React, { useState, useEffect } from "react";
import PostService from "../services/Test";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthenticationService";

const PrivateContent = () => {
    const [privatePosts, setPrivatePosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        PostService.getAllPrivatePosts().then(
            (response) => {
                setPrivatePosts(response.data);
            },
            (error) => {
                console.log("Private page", error.response);
                // Invalid token
                if (error.response && error.response.status === 403) {
                    AuthService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );
    }, []);

    return (
        <div>
            <h3>{JSON.stringify(privatePosts)}</h3>
        </div>
    );
};

export default PrivateContent;