import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStudent } from "../../services/StudentService";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./StudentCard.css";
import {useContext} from "react";
import UserContext from "../../context/userContext";

const StudentCard = (props) => {

    const { user } = useContext(UserContext);

    const queryClient = new useQueryClient();

    const mutation  = useMutation(removeStudent, {
        onSuccess:() => {
            queryClient.invalidateQueries(['students']).catch(error => error);
        }
    });

    return (
        <tr className="student-card">
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.dateOfBirth}</td>
            <td>{props.age}</td>
            <td>
                <Link className="student-click-for-details" to={"/students/" + props.id}>
                    Click for details
                </Link>
            </td>
            { user.role[0] === "ROLE_ADMIN" ?
            <td>
                <RiCloseFill
                    onClick={ () => mutation.mutate(props.id)}
                    className="remove-student-button"
                    size={32}
                />
            </td> : null}
        </tr>
    )
}

export default StudentCard;