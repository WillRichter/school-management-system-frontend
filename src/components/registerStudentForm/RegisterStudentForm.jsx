import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentService from "../../services/StudentService";
import "./RegisterStudentForm.css";

const RegisterStudentForm = () => {

    const queryClient = new useQueryClient();

    const [ validForm, setValidForm] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ studentForm, setStudentForm ] = useState({name: "", email: ""});
    const [ date, setDate ] = useState("1970-01-01");
    let image = null;

    const mutation  = useMutation(StudentService.registerStudent, {
        onSuccess:() => {
            queryClient.invalidateQueries(['students']).catch(error => error);
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentForm( prevValue => {
            return {
                ...prevValue,
                [name] : value
            }
        });
    }

    const handleImageChange = event => {
        image = event.target.files[0];
    }

    const validateForm = () => {
        let errors = {};
        if(studentForm.name.length > 15 || studentForm.name.length < 4) {
            errors["username"] = "Name must be between 4 and 15 characters long";
        }
        if(studentForm.email.length === 0) {
            errors["email"] = "Email must have at least 10 characters";
        }
        if(date === "") {
            errors["date"] = "Date field cannot be empty: ";
        }
        if(image === null) {
            errors["image"] = "Image must be selected to upload";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm();
        setValidForm(isValid);
        if(isValid) {
            let form = new FormData();
            form.append("name", studentForm.name);
            form.append("email", studentForm.email);
            form.append("dateOfBirth", date);
            form.append("file", image);
            mutation.mutate(form);
            setStudentForm({name: "", email: ""});
            image = null;
            setDate(null);
        }
    };


    const handleDateChange = (event) => {
        const { value } = event.target;
        console.log(value);
        setDate(value);
    }

    return(
        <>
            <form className="student-form" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Student name" name="name" value={studentForm.name} />
                <input onChange={handleChange} type="email" placeholder="Student email" name="email" value={studentForm.email} />
                <input name="date" type="date" onChange={handleDateChange} value={date} />
                <input onChange={handleImageChange} type="file" name="file" />
                <button>Register Student</button>
            </form>
            { validForm ? null :
                <ul className="student-form-error-messages">
                    { Object.keys(errors).map( (error, i) => <li key={error + i}>{errors[error]}</li>) }
                </ul>
            }
        </>

    )
}

export default RegisterStudentForm;