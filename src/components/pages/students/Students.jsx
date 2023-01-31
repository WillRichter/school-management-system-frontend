import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentService from "../../../services/StudentService";
import UserContext from "../../../context/userContext";
import StudentCard from "../../studentCard/StudentCard";
import Loading from "../../loading/Loading";
import RegisterStudentForm from "../../registerStudentForm/RegisterStudentForm";
import MobileStudentCard from "../../mobileStudentCard/MobileStudentCard";
import "./Students.css";

const Students = () => {
    const { user } = useContext(UserContext);

    const { isLoading, isError, error, data }= useQuery(['students'], StudentService.fetchStudents);

    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect( () => {
        const handleWindowResize = () => setWidth( () => window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
    }, []);

    const createStudentCard = student => {
        return (
            <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                dateOfBirth={student.dateOfBirth}
                age={student.age}
            />
        )
    };

    const createMobileStudentCard = student => {
        return (
            <MobileStudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                dateOfBirth={student.dateOfBirth}
                age={student.age}
            />
        );
    };

    if(isLoading) return <Loading />
    if(isError) return <h1>Error, please try again. {error.message}</h1>

    return(
        <div className="students-page-container">
            <h1 className="students-page-title">Registered Students</h1>
            { user.role[0] === "ROLE_ADMIN" ? <RegisterStudentForm /> : null}
            {width > 1000 ?
                <>
                    <table className="students-table">
                        <thead>
                        <tr>
                            <th>UUID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Information</th>
                            { user.role[0] === "ROLE_ADMIN" ? <th>Remove</th> : null }
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(createStudentCard)}
                        </tbody>
                    </table>
                </>
            : <>{data.map(createMobileStudentCard)}</>
            }
        </div>
    )
}

export default Students;