import axios from "axios";
import authHeader from "./AuthenticationHeader";

const API_URL = "http://localhost:8080/api/test";

const getAllPublicPosts = () => {
    return axios.get(API_URL + "/all");
};

const getAllPrivatePosts = () => {
    return axios.get(API_URL + "/greeting", { headers: authHeader() });
};

const postService = {
    getAllPublicPosts,
    getAllPrivatePosts,
};

export default postService;