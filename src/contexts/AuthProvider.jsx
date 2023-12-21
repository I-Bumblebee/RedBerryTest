import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("isSignedIn");

        if (JSON.parse(authStatus)) {
            setIsSignedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
