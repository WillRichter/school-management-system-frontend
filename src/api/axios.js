import axios from 'axios';
import customHistory from "../components/customHistory/customHistory";
import userService from "../services/UserService";

const API = axios.create({
    baseURL: "https://backend.school-management-system.link/api/v1",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use( function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
)

API.interceptors.response.use( function (response) {
        return response;
    }, function (error) {
        if(error.response.status === 403) {
            userService.logoutUser()
                .catch(error => error);
            customHistory.replace("/login");
        }
        return Promise.reject(error);
    }
)

export default API;

