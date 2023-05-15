import { createContext, useEffect, useState } from "react";
import jwt from 'jwt-decode'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const tokenAcesso = localStorage.getItem("tokenAcesso");

        if (tokenAcesso != null) {
            let decodeToken = jwt(tokenAcesso)
            if (new Date(decodeToken.exp * 1000) > Date.now()) {
                setUser(1)
            }
        }
    }, []);

    const signin = (token) => {
        localStorage.setItem("tokenAcesso", token);
        setUser(1)
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("tokenAcesso");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
