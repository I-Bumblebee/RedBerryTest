import React from 'react';

const AuthContext = React.createContext({
    isSignedIn: false,
    setIsSignedIn: () => {},
});

export default AuthContext;
