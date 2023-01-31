import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_HistoryRouter as HistoryRouter, Route, Routes} from "react-router-dom";
import RouteGuard from "./components/routeGuard/RouteGuard";
import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Students from "./components/pages/students/Students";
import Student from "./components/pages/student/Student";
import Users from "./components/pages/users/Users";
import UserContext from "./context/userContext";
import customHistory from "./components/customHistory/customHistory";
import { SetUser } from "./components/hooks/SetUser";
import './App.css';

const queryClient = new QueryClient();

function App() {

    const [ user, setUser ] = useState();
    SetUser(setUser);

    return (
            <HistoryRouter history={customHistory}>
                <QueryClientProvider client={queryClient}>
                    <UserContext.Provider value={{ user, setUser }}>
                        <Header />
                        <Routes>
                            {/* Anyone is able to access these routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            {/* Must be logged in to view these routes */}
                            <Route path="/students" element={<RouteGuard><Students /></RouteGuard>} />
                            <Route path="/students/:id" element={<RouteGuard><Student /></RouteGuard>} />
                            <Route path="/users" element={<RouteGuard><Users /></RouteGuard>}/>
                        </Routes>
                    </UserContext.Provider>
                </QueryClientProvider>
            </HistoryRouter>
  );
}

export default App;
