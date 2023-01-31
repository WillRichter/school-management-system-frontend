import API from "../api/axios";

const fetchStudent = async studentID => {
    const { data } = await API.get(`/students/${studentID}`);
    return data;
}

const fetchStudents = async () => {
    const { data } = await API.get("/students");
    return data;
}

const registerStudent = async student => {
    const { data } = await API.post("/students", student, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return data;
}

const updateStudent = async studentDetails => {
    const { data } = await API.put(`/students/${studentDetails[0]}`, studentDetails[1]);
    return data;
}

export const removeStudent = async studentID => {
    const { data } = await API.delete(`/students/${studentID}`);
    return data;
}

const addAddressToStudent = async addressDetails => {
    const { data } = await API.post(`/students/${addressDetails[0]}/address`, addressDetails[1]);
    return data;
}

const updateAddressForStudent = async addressDetails => {
    const { data } = await API.put(`/students/${addressDetails[0]}/address`, addressDetails[1]);
    return data;
}

const StudentService = {
    fetchStudent,
    fetchStudents,
    registerStudent,
    removeStudent,
    updateStudent,
    addAddressToStudent,
    updateAddressForStudent
}

export default StudentService;
