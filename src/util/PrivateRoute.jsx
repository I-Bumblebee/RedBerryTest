import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { isSignedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isSignedIn === undefined) return;
        if (!isSignedIn) {
            navigate("/RedBerryTest/");
        }
    }, [isSignedIn, navigate]);

    return isSignedIn ? children : null;
}

export default PrivateRoute;