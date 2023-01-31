import { useState } from 'react';
import { useParams }  from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import StudentService from "../../services/StudentService";
import "./UpdateStudentForm.css";

const UpdateStudentForm = props => {

    const params = useParams();

    const queryClient = useQueryClient();

    const [ details, setDetails ] = useState({name: props.name, email: props.email});

    const mutation = useMutation(StudentService.updateStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['student']).catch(error => console.log(error));
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails( prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const config = [params.id, details];

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate(config);
        setDetails({name: "", email: ""});
        props.setIsUpdateClicked(!props.isUpdateClicked);
    }

    return (
        <div className="student-update-modal">
            <div className="student-update-modal-content">
                <div className="student-update-modal-content-header">
                    <h1>Update Student Details</h1>
                </div>
                <div className="student-update-modal-content-body">
                    <form className="student-update-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Student name"
                            value={details.name}
                            minLength="3"
                            maxLength="20"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Student email"
                            value={details.email}
                            maxLength="30"
                            onChange={handleChange}
                        />
                        <button>
                            Update
                        </button>
                        <button onClick={props.setIsUpdateClicked}>
                            Close Form
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateStudentForm;