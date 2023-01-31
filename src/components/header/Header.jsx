import { useState, useContext } from "react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import UserContext from "../../context/userContext";
import "./Header.css";

const Header = () => {

    const { user, setUser } = useContext(UserContext);
    const [ isClicked, setIsClicked ] = useState(false);

    const handleClick = () => {
        setIsClicked( isClicked => !isClicked);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <header>
            <nav className="nav">
                <Link className="header-link" to="/"><h1 className="nav-title">Student Management System</h1></Link>

                { user ? <h2 className="logged-in-user">You are logged in as: {user.sub}</h2> : null }

                { isClicked ?
                    <RiCloseFill onClick={handleClick} className="menu-close-button" size={32}/>
                    :
                    <RiMenuFill onClick={handleClick} className="menu-open-button" size={32} />
                }

                <ul className="nav-links">
                    {user ?
                        <>
                            <Link className="link" to="/"><li className="nav-link">Home</li></Link>
                            <Link className="link" to="/students"><li className="nav-link">Students</li></Link>
                            <Link className="link" to="/users"><li className="nav-link">Users</li></Link>
                            <Link className="link" to="/">
                                <li className="nav-link" onClick={() => {
                                    UserService.logoutUser().catch(error => console.log(error));logout()}}>
                                    Logout
                                </li>
                            </Link>
                        </>
                        :
                        <>
                            <Link className="link" to="/"><li className="nav-link">Home</li></Link>
                            <Link className="link" to="/login"><li className="nav-link">Login</li></Link>
                        </>
                    }
                </ul>

                {isClicked ?
                    <ul className="mobile-nav-links">
                        {user ?
                            <>
                                <Link className="link" to="/">
                                    <li className="mobile-nav-link">Home</li>
                                </Link>
                                <Link className="link" to="/students">
                                    <li className="mobile-nav-link">Students</li>
                                </Link>
                                <Link className="link" to="/users">
                                    <li className="mobile-nav-link">Users</li>
                                </Link>
                                <Link className="link" to="/">
                                    <li className="mobile-nav-link" onClick={() => {
                                        UserService.logoutUser().catch(error => console.log(error));
                                        logout()}}>
                                        Logout
                                    </li>
                                </Link>
                            </>
                            :
                            <>
                                <Link className="link" to="/">
                                    <li className="mobile-nav-link">Home</li>
                                </Link>
                                <Link className="link" to="/login">
                                    <li className="mobile-nav-link">Login</li>
                                </Link>
                            </>
                        }
                    </ul>
                    : null
                }
            </nav>
        </header>
    )
}

export default Header;