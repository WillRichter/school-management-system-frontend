import { useState } from 'react';
import { useParams }  from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import StudentService from "../../services/StudentService";
import "./AddressForm.css";

const AddressForm = props => {

    const params = useParams();

    const queryClient = useQueryClient();

    const [ details, setDetails ] = useState({
        houseNumber: props.houseNumber,
        street: props.street,
        city: props.city,
        postcode: props.postcode
    });

    const addAddressMutation = useMutation(StudentService.addAddressToStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['student'])
                .catch(error => console.log(error));
        }
    });

    const updateAddressMutation = useMutation(StudentService.updateAddressForStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['student'])
                .catch(error => console.log(error));
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

    const handleAddSubmit = (event) => {
        event.preventDefault();
        addAddressMutation.mutate(config);
        props.setIsAddressClicked(!props.isAddressClicked);
    }

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        updateAddressMutation.mutate(config);
        props.setIsAddressClicked(!props.isAddressClicked);
    }

    return (
        <div className="address-update-modal">
            <div className="address-update-modal-content">
                <div className="address-update-modal-content-header">
                    <h1>Update Student Address</h1>
                </div>
                <div className="address-update-modal-body">
                    <form className="student-update-form">
                        <input onChange={handleChange} type="text" name="houseNumber" placeholder="House Number"
                               value={details.houseNumber} />
                        <input onChange={handleChange} type="text" name="street" placeholder="Street"
                               value={details.street} />
                        <input onChange={handleChange} type="text" name="city" placeholder="City"
                               value={details.city} />
                        <input onChange={handleChange} type="text" name="postcode" placeholder="Postcode"
                               value={details.postcode} />
                        { props.hasAddress
                            ? <button onClick={handleUpdateSubmit}>Update</button>
                            : <button onClick={handleAddSubmit}>Add</button>
                        }
                        <button onClick={(event) => {event.preventDefault(); props.setIsAddressClicked()}}>
                            Close Form
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddressForm;