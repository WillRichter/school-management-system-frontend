import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../services/UserService";
import "./RegisterUserForm.css";

const RegisterUserForm = () =>{

    const queryClient = useQueryClient();

    const [ validForm, setValidForm ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ userForm, setUserForm ] = useState({username: "", email: "", password: "", role: "ROLE_USER"});

    const mutation  = useMutation(UserService.registerUser, {
        onSuccess:() => {
            queryClient.invalidateQueries(['users']).catch(error => console.log(error));
        }
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setUserForm( prevState => {
            return {
                ...prevState,
                [name] : value
            };
        });
    };

    const validateForm = () => {
        let errors = {};
        if(userForm.username.length > 15 || userForm.username.length < 4) {
            errors["username"] = "Username must be between 4 and 15 characters long";
        }
        if(userForm.email.length === 0) {
            errors["email"] = "Email cannot be empty";
        }
        if(userForm.password.length < 5) {
            errors["password"] = "Password must be 5 characters or longer";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = event => {
        event.preventDefault();
        const isValid = validateForm(userForm);
        setValidForm(isValid);
        if(isValid) {
            mutation.mutate(userForm);
            setUserForm({username: "", email: "", password: "", role: "ROLE_USER"})
        }
    }

    return(
        <>
            <form className="user-form" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="username" placeholder="Username"
                       value={userForm.username} />
                <input onChange={handleChange} type="email" name="email" placeholder="Email"
                       value={userForm.email} />
                <input onChange={handleChange} type="password" name="password" placeholder="Password"
                       value={userForm.password} />
                <select onChange={handleChange} name="role" >
                    <option disabled>Choose account type</option>
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                </select>
                <button>Register User</button>
            </form>
            { validForm ? null :
                    <ul className="user-form-error-messages">
                        {Object.keys(errors).map((error, i) => <li key={error + i}> {errors[error]}</li>)}
                    </ul>
            }

        </>

    )
}

export default RegisterUserForm;