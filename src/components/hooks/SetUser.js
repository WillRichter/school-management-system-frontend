import { useEffect } from "react";
import jwtDecode from "jwt-decode";

export const SetUser = (setUser) => {
    const token = localStorage.getItem("accessToken");
    useEffect( () => {
        if(token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } else {
            setUser(null);
        }
    },[setUser, token]);
}

