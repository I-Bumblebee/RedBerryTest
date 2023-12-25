import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(undefined);

    useEffect(() => {
        const authStatus = localStorage.getItem("isSignedIn");

        if (JSON.parse(authStatus) === true) {
            setIsSignedIn(true);
        } else if (JSON.parse(authStatus) === false) {
            setIsSignedIn(false);
        } else {
            localStorage.setItem("isSignedIn", JSON.stringify(false));
            setIsSignedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
