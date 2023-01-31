import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../../context/userContext";
import UserService from "../../../services/UserService";
import RegisterUserForm from "../../registerUserForm/RegisterUserForm";
import UserCard from "../../userCard/UserCard";
import MobileUserCard from "../../mobileUserCard/MobileUserCard";
import "./Users.css";
import Loading from "../../loading/Loading";

const Users = () => {

    const { user } = useContext(UserContext);

    const { isLoading, isError, error, data } = useQuery(['users'], UserService.fetchUsers);

    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect( () => {
        const handleWindowResize = () => setWidth( () => window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
    }, []);

    const createUserCard = user => {
        return (
            <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                email={user.email}
                role={user.role}
            />
        );
    };

    const createMobileUserCard = user => {
        return (
            <MobileUserCard
                key={user.id}
                id={user.id}
                name={user.username}
                email={user.email}
                role={user.role}
            />
        )
    }

    if(isLoading) return <Loading />
    if(isError) return <h1>Error! Please try again. {error.message}</h1>

    return(
        <div className="users-page-container">
            <h1 className="users-page-title">Registered Users</h1>
            { user.role[0] === "ROLE_ADMIN" ? <RegisterUserForm /> : null}
            { width > 1000 ?
                <>
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            { user.role[0] === "ROLE_ADMIN" ? <th>Remove</th> : null }
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(createUserCard)}
                        </tbody>
                    </table>
                </>
                : <>{data.map(createMobileUserCard)}</>
            }
        </div>
    )
}

export default Users;