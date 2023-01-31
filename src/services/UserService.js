import API from "../api/axios";

const fetchUsers = async () => {
    const { data } = await API.get("/users");
    return data;
}

const registerUser = async userDetails => {
    const { data } = await API.post("/users", userDetails);
    return data;
};

const loginUser  = async userDetails => {
    const { data } = await API.post("/users/login", userDetails);
    localStorage.setItem("accessToken", data.accessToken);
    return data;
};

const logoutUser = async () => {
    localStorage.removeItem("accessToken");
    await API.post("/users/logout");
};

const removeUser = async userID => {
    await API.delete(`/users/${userID}`);
}

const UserService = {
    fetchUsers,
    registerUser,
    loginUser,
    logoutUser,
    removeUser
}

export default UserService;

