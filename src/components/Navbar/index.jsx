import './Navbar.css'
import { ReactComponent as RedBerryLogo } from '../../assets/red-berry-logo.svg'
import AuthContext from "../../contexts/AuthContext";
import {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import SignIn from "../SignIn";
import OutsideClickHandler from "../../util/OutsideClickHandler";

function Navbar() {
    const { isSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const location = useLocation();
    const [isSignInVisible, setIsSignInVisible] = useState(true);

    useEffect(() => {
        if (location.pathname === "/post-blog") {
            setIsSignInVisible(false);
        } else {
            setIsSignInVisible(true);
        }
    }, [location.pathname])

    const handleClicked = () => {
        if (isSignedIn) {
            navigate("/RedBerryTest/post-blog");
        } else {
            setIsOverlayVisible(true)
        }
    }

    return (
        <div className={`${isSignInVisible ? "navbar" : "navbar-when-posting"}`}>
            <RedBerryLogo className="navbar-logo" onClick={() => navigate("/RedBerryTest/")}/>
            { isSignInVisible &&
                <button className="sign-in-button" onClick={handleClicked}>{!isSignedIn ? "შესვლა" : "დაამატე ბლოგი"}</button>
            }
            { isOverlayVisible &&
                <div className="sign-in-overlay">
                    <OutsideClickHandler onOutsideClick={() => setIsOverlayVisible(false)}>
                        <SignIn setIsOverlayVisible={setIsOverlayVisible}/>
                    </OutsideClickHandler>
                </div>
            }
        </div>
    )
}

export default Navbar
