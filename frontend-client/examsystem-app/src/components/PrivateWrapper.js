import {Outlet, Navigate, Route, useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "./AuthHandler";


const PrivateWrapper = ({ children, setLogin}) => {
    const { userLoggedIn } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (!userLoggedIn() && (path.startsWith("/logs") || path === "/exams")) {
            console.log("PrivateWrapper: user not logged in");
            console.log(user + "user " + userLoggedIn() + " userLoggedIn ");
            setLogin(true);

        }
    }, [user]);

    console.log("PrivateWrapper: userLoggedIn: " + userLoggedIn());

    return <>{userLoggedIn() ? children : <Navigate to= "/" />}</>;
};

export default PrivateWrapper;


