import {Outlet, Navigate, Route, useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "./AuthHandler";


const PrivateWrapper = ({ children, setLogin, setNextPage}) => {
    const { user } = useContext(AuthContext);


    useEffect(() => {
        if (!user) {
            setNextPage(window.location.pathname);
            setLogin(true);
        }
    }, [user, setLogin]);

    return <>{user ? children : <Navigate to="/" />}</>;
};

export default PrivateWrapper;


