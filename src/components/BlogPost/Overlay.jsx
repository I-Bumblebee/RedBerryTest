import "./Overlay.css";
import { ReactComponent as XIcon } from "../../assets/x-icon.svg";
import { ReactComponent as TickIcon } from "../../assets/tick-icon.svg";

const Overlay = ({ success, onClick }) => {
    return (
        <div
            className="overlay-container"
            style={{ display: success ? "flex" : "none" }}
        >
            <div className="overlay">
                <XIcon className="overlay-x-icon" onClick={onClick}/>
                <div className="overlay-text">
                    <TickIcon className="overlay-tick-icon" />
                    <h2>ბლოგი წარმატებით დაემატა</h2>
                </div>
                <button className="overlay-button" onClick={onClick}>მთავარ გვერდზე დაბრუნება</button>
            </div>
        </div>
    );
};

export default Overlay;