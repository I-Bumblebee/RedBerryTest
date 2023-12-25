import "./CatItem.css";

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
                     title,
                     background_color,
                     onClick,
                     selected,
                     providedStyles = {},

                 }) => {
    return (
        <div
            className="cat-item"
            style={{ backgroundColor: hexToRGBA(background_color, 0.08), color:background_color, outline: selected ? "1px solid black" : "none", ...providedStyles }}
            onClick={onClick}
        >
            <p>{title}</p>
        </div>
    );
};

export default CatItem;
