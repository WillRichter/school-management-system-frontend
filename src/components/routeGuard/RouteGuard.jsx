import { Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {

    const hasJWT = () => {
        let flag;
        localStorage.getItem("accessToken") ? flag = true : flag = false;
        return flag;
    }

    if(hasJWT()) return children;

    return <Navigate to="/login" />
}

export default RouteGuard;