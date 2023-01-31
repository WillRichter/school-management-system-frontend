import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiCloseFill } from "react-icons/ri";
import UserService from "../../services/UserService";
import "./MobileUserCard.css";

const MobileStudentCard = (props) => {

    const queryClient = useQueryClient();
    const mutation = useMutation(UserService.removeUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']).catch(error => error);
        }
    })

    return (
        <article className="mobile-user-card">
            <p className="mobile-user-card-id">ID# {props.id}</p>
            <p className="mobile-user-card-name">Name: {props.name}</p>
            <p className="mobile-user-card-email">Email: {props.email}</p>
            <p className="mobile-user-card-role">Account type: {props.role.toLowerCase().substring(5)}</p>
            <div className="mobile-user-card-divider"/>
            <div className="mobile-user-card-footer">
                <RiCloseFill
                    onClick={ () => mutation.mutate(props.id)}
                    className="remove-student-button"
                    size={32}
                />
            </div>
        </article>
    )
}

export default MobileStudentCard;