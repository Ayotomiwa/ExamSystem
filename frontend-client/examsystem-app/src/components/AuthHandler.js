import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AUthHandler = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            console.log("storedUser: ", storedUser);
            const decodedUser = jwtDecode(JSON.parse(storedUser).token);
            const currentTime = Date.now() / 1000;

            if (decodedUser.exp > currentTime) {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("user");
                console.log("User token expired...Removed from local storage");
            }
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AUthHandler.Provider value={{ user, login, logout }}>
            {children}
        </AUthHandler.Provider>
    );
};

export default AUthHandler;
