import "./BlogItem.css";
import CatItem from "../Home/CatItem";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-icon.svg";

function BlogItem({
    id,
    image,
    title,
    date,
    author,
    description,
    categories,
    fullScale,
    email,
}) {
    return (
        <div
            className="blog-item"
            style={
                fullScale
                    ? { width: "960px", height: "auto" }
                    : { width: "544px", height: "827px" }
            }
        >
            <img
                src={image}
                alt="Blog Item"
                style={
                    fullScale
                        ? { width: "960px", height: "437px" }
                        : { width: "544px", height: "437px" }
                }
            />
            <h3 style={fullScale ? {marginTop: "53px"} : {}}>{author}</h3>
            <h4 style={fullScale ? {marginTop: "18px"} : {}}>{date + (fullScale ?  (email ? "  •  " + email : ""): "")}</h4>
            <h2 style={fullScale ? { fontSize: "43px", marginTop: "32px"} : { fontSize: "27px" }}>
                {title}
            </h2>
            <div className="blog-item-categories-row" style={fullScale ? {marginTop: "32px"} : {}}>
                {categories.map((cat) => (
                    <CatItem
                        key={cat.id}
                        id={cat.id}
                        title={cat.title}
                        background_color={cat.background_color}
                        selected={false}
                        onClick={() => {}}
                        providedStyles={{ padding: "8px 14px" }}
                    />
                ))}
            </div>
            <p
                style={
                    fullScale
                        ? {marginTop: "53px"}
                        : {
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              height: `calc(56px * var(--multiplier))`,
                          }
                }
            >
                {description}
            </p>

            {fullScale ? null : (
                <Link to={`/view-blog/${id}`} className="blog-view-link">
                    სრულად ნახვა <ArrowIcon className="arrow-icon" />
                </Link>
            )}
        </div>
    );
}

export default BlogItem;
