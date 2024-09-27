import axios from "axios";
import { API_BASE_URL, authHeaders, headers } from "./api.config";

const authApi = {
    login: (email, password) => {
        console.log("api login");
        const postData = {
        email: email,
        password: password,
        };
        return axios.post(API_BASE_URL + "/auth/login", postData, headers);
    },
    register: async (queryParams) => {
        console.log("api register");
        const postData = {
            name: queryParams.name,
            email: queryParams.email,
            password: queryParams.password,
            phoneNumber: queryParams.phoneNumber,
            address: queryParams.address,
            role: queryParams.role,
        };
        const response = await axios.post(
        API_BASE_URL + "/auth/register",
        postData,
        headers
        );
        return response;
    },
    setUser: async () => {
        console.log("api setUser");
        // const token = localStorage.getItem("accessToken");
        const response = await axios.get(API_BASE_URL + "/auth/me", authHeaders);
        return response;
    },
};
export default authApi;
