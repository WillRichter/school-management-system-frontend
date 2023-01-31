import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiCloseFill } from "react-icons/ri";
import UserService from "../../services/UserService";
import "./UserCard.css";
import {useContext} from "react";
import UserContext from "../../context/userContext";

const UserCard = (props) => {

    const { user } = useContext(UserContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(UserService.removeUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']).catch(error => error);
        }
    });

    return(
        <tr className="user-card">
            <td>{props.id}</td>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.role.toLowerCase().substring(5)}</td>
            { user.role[0] === "ROLE_ADMIN" ?
            <td>
                <RiCloseFill
                    className="user-remove-button"
                    onClick={ () => mutation.mutate(props.id)}
                    size={32}
                />
            </td> : null }
        </tr>
    )
}

export default UserCard;