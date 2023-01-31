import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import { removeStudent } from "../../services/StudentService";
import "./MobileStudentCard.css";

const MobileStudentCard = (props) => {

    const queryClient = useQueryClient();

    const mutation = useMutation(removeStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['students']).catch(error => error);
        }
    });

    return (
        <article className="mobile-student-card">
            <p className="mobile-student-card-id">ID# {props.id}</p>
            <p className="mobile-student-card-name">Name: {props.name}</p>
            <p className="mobile-student-card-email">Email: {props.email}</p>
            <p className="mobile-student-card-dob">Date of birth: {props.dateOfBirth}</p>
            <p className="mobile-student-card-age">Age: {props.age}</p>
            <div className="mobile-student-card-divider"/>
            <div className="mobile-student-card-footer">
                <Link className="click-for-details" to={"/students/" + props.id}>Click for details</Link>
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