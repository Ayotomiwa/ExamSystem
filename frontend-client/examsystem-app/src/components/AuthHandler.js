import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AUthHandler = createContext(null);

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);


    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        console.log("UseEffect: Before if statement in AuthHandler.js");
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // console.log("storedUser: ", storedUser);
            const decodedUser = jwtDecode(JSON.parse(storedUser).token);
            const currentTime = Date.now() / 1000;

            console.log("UseEffect: Inside useEffect of AuthHandler.js");

            if (decodedUser.exp > currentTime) {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("user");
                setUser(null);
                console.log("User token expired...Removed from local storage");
            }
        }
    }, []);


    const userLoggedIn = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const decodedUser = jwtDecode(JSON.parse(storedUser).token);
            const currentTime = Date.now() / 1000;

            if (decodedUser.exp > currentTime) {
                return true;
            } else {
                localStorage.removeItem("user");
                console.log("User token expired...Removed from local storage");
                return false;
            }
        }
        return false;
    }



    return (
        <AUthHandler.Provider value={{ user, userLoggedIn, login, logout }}>
            {children}
        </AUthHandler.Provider>
    );
};

export default AUthHandler;
