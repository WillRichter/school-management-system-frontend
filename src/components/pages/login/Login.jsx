import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import UserService from "../../../services/UserService";
import UserContext from "../../../context/userContext";
import { SetUser } from "../../hooks/SetUser";
import "./Login.css";

const Login = () => {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [ loginForm, setLoginForm ] = useState({username: "", password: ""});

    SetUser(setUser);

    const handleChange = event => {
        const { name, value } = event.target;
        setLoginForm(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        try {
            UserService.loginUser(loginForm)
                .then( response => {
                    const decodedJWT = jwtDecode(response.accessToken);
                    setUser(decodedJWT);
                    setLoginForm({username: "", password: ""});
                    navigate("/students");
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-form-container">
            <h1 className="login-form-header">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    required
                    value={loginForm.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    value={loginForm.password}
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;