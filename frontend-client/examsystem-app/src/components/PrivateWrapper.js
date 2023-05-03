import {Outlet, Navigate, Route, useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "./AuthHandler";


const PrivateWrapper = ({ children, setLogin, setNextPage}) => {
    const { user } = useContext(AuthContext);


    useEffect(() => {
        if (!user && window.location.pathname !== "/") {
            setNextPage(window.location.pathname);
            setLogin(true);
            console.log('user is not found');
        }
    }, [user, setLogin, setNextPage]);

    return <>{user ? children : <Navigate to="/" />}</>;
};

export default PrivateWrapper;


