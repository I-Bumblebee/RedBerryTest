import "./CatItem.css";
import { ReactComponent as WhiteXIcon } from "../../assets/white-x-icon.svg";

function hexToRGBA(hex, alpha = 1) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : null;
}


const CatItem = ({
    id,
    title,
    text_color,
    background_color,
    displayIcon,
    onClick,
    selected,

}) => {
    return (
        <div
            className="cat-item"
            style={{ backgroundColor: !selected ? hexToRGBA(background_color, 0.08): background_color, color: !selected ? background_color: text_color}}
            onClick={onClick}
        >
            <p>{title}</p>
            {displayIcon && <WhiteXIcon className="white-x-icon" onClick={onClick}/>}
            {/*{displayIcon && <WhiteXIcon className="white-x-icon" />}*/}
        </div>
    );
};

export default CatItem;
