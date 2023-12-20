import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
