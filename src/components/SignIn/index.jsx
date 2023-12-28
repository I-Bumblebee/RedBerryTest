import React, { useState } from "react";
import "./SignIn.css";
import { ReactComponent as XIcon } from "../../assets/x-icon.svg";
import { ReactComponent as InfoIcon } from "../../assets/info-icon.svg";
import { ReactComponent as TickIcon } from "../../assets/tick-icon.svg";
import AuthContext from "../../contexts/AuthContext";
import {useNavigate}    from "react-router-dom";

function SignIn({ setIsOverlayVisible }) {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { isSignedIn, setIsSignedIn } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "") {
            setErrorMessage("შეავსეთ ველი");
            return;
        }

        if (!email.toLowerCase().endsWith("@redberry.ge")) {
            setErrorMessage("ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით");
            return;
        }

        fetch("https://api.blog.redberryinternship.ge/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ email }),
        }).then((response) => {
            if (response.status === 422) {
                setErrorMessage("ელ-ფოსტა არ არსებობს");
            } else if (response.status === 204) {
                setErrorMessage("");
                setIsSignedIn(true);
                localStorage.setItem("isSignedIn", JSON.stringify(true));
                // localStorage.setItem("email", JSON.stringify(email));
            } else {
                setErrorMessage("რაღაც არასწორია, სცადეთ თავიდან მოგვიანებით");
            }
        });
    };

    const handleClose = () => {
        navigate("/RedBerryTest/");
        setIsOverlayVisible(false);
    }

    return (
        <div className="sign-in">
            <div
                className="sign-in-close"
                onClick={handleClose}
            >
                <XIcon className="sign-in-close-icon" />
            </div>
            {!isSignedIn ? (
                <>
                    <h3 className="sign-in-title">შესვლა</h3>
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <label className="email-label">
                            ელ-ფოსტა
                            <br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Example@redberrry.ge"
                                className={`email-input-box  ${
                                    errorMessage !== "" && "error"
                                }`}
                            />
                            {errorMessage !== "" && (
                                <div className="error-message">
                                    <InfoIcon className="info-icon" />
                                    <span className="error-message-text">
                                        {errorMessage}
                                    </span>
                                </div>
                            )}
                        </label>

                        <input
                            type="submit"
                            value="შესვლა"
                            className="submit-button"
                        />
                    </form>
                </>
            ) : (
                <div className="signed-in">
                    <div className="container">
                        <TickIcon className="tick-icon" />
                        <h3 className="signed-in-text">
                            წარმატებული ავტორიზაცია
                        </h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="submit-button accepted"
                    >
                        {" "}
                        კარგი
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignIn;
