import { createContext } from "react";

const UserContext = createContext({
    user: undefined,
    setUser: () => {}
});

export default UserContext;





