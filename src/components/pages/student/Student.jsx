import {useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import StudentService from "../../../services/StudentService";
import UpdateStudentForm from "../../updateStudentForm/UpdateStudentForm";
import AddressForm from "../../addressForm/AddressForm";
import './Student.css';
import Loading from "../../loading/Loading";
import UserContext from "../../../context/userContext";

const Student = () => {

    const { user } = useContext(UserContext);
    const params = useParams();
    const [ isUpdateClicked, setIsUpdateClicked ] = useState(false);
    const [ isAddressClicked, setIsAddressClicked ] = useState(false);

    const handleUpdateClick = () => {
        setIsUpdateClicked(!isUpdateClicked);
    }

    const handleAddressClick = () => {
        setIsAddressClicked(!isAddressClicked);
    }

    const { isLoading, isError, data } = useQuery(
        ['student', params.id], () => StudentService.fetchStudent(params.id));

    if(isLoading) return <Loading />
    if(isError) return <h1>Error, try again!</h1>

    return (
        <div className="student-page-container">
            <h1 className="student-page-title">{data.name}</h1>
            <div className="student-page-details-container">
                <div className="student-page-details">
                    <div className="image-container">
                        <img id="student-image"
                             className="student-image"
                             src={"data:image/png;base64," + data.image}
                             alt={data.image}
                        />
                    </div>
                    <div className="student-page-details-and-address-container">
                        <div className="student-page-standard-details">
                            <h3>Details:</h3>
                            <p><i>ID#</i> {data.id}</p>
                            <p>Name: {data.name}</p>
                            <p>Email: {data.email}</p>
                            <p>Date of birth: {data.dateOfBirth}</p>
                            <p>Age: {data.age}</p>

                            { user.role[0] === "ROLE_ADMIN"
                                ?
                                <button className="student-details-edit-button" onClick={handleUpdateClick}>
                                    {isUpdateClicked ? <p>Close</p> : <p>Change details</p>}
                                </button>
                                : null }

                        </div>
                        <div className="student-page-address">
                            <h3>Address:</h3>
                            {data.address ?
                                <>
                                    <p>{data.address.houseNumber}</p>
                                    <p>{data.address.street}</p>
                                    <p>{data.address.city}</p>
                                    <p>{data.address.postcode}</p>
                                </> : <p>No address saved</p>
                            }

                            { user.role[0] === "ROLE_ADMIN"
                                ?
                                <button className="student-address-edit-button" onClick={handleAddressClick}>
                                    {isAddressClicked ? <p>Close</p> : <p>Change address</p>}
                                </button>
                                : null }

                        </div>
                    </div>
                </div>
            </div>

            { isUpdateClicked ?
                <UpdateStudentForm
                    name={data.name}
                    email={data.email}
                    isUpdateClicked={isUpdateClicked}
                    setIsUpdateClicked={setIsUpdateClicked}
                /> : null
            }

            { isAddressClicked ?
                <AddressForm
                    hasAddress ={ data.address ? true : false }
                    houseNumber={ data.address ? data.address.houseNumber : ""}
                    street={data.address ? data.address.street : ""}
                    city={data.address ? data.address.city : ""}
                    postcode={data.address ? data.address.postcode : ""}
                    isAddressClicked={isAddressClicked}
                    setIsAddressClicked={setIsAddressClicked}
                /> : null
            }
        </div>
    )
}

export default Student;