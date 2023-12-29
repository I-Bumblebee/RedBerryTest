import "./BlogView.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BlogItem from "../BlogItem";
import { ReactComponent as LeftArrowIcon } from "../../assets/left-arrow-icon.svg";

function ViewBlog({ blogs }) {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        image: "",
        publish_date: "",
        categories: [],
        author: "",
        email: "",
    });

    const [similarBlogs, setSimilarBlogs] = useState([]);

    const similarsRowRef = useRef(null);
    const [isMaxLeft, setIsMaxLeft] = useState(true);
    const [isMaxRight, setIsMaxRight] = useState(true);

    useEffect(() => {
        const token = `ee383d4cbf7503aaf852de7ba37c49d6a3911e1b46002bd9ddc5d9eadaa26889`;
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            `https://api.blog.redberryinternship.ge/api/blogs/${id}`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setBlogData(data);
            });

        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        //     first filter blogs by categories and only keep the ones that have at least one matching category to the current blog
        const categoryIDs = blogData.categories.map((cat) => cat.id);
        const filteredBlogs = blogs.filter((blog) =>
            blog.categories.some((cat) => categoryIDs.includes(cat.id)),
        );

        //     then filter the blogs by date and only keep the ones that are published before the current date
        const now = new Date();
        const filteredBlogsByDate = filteredBlogs.filter((blog) => {
            const blogDate = new Date(blog.publish_date);
            return blogDate <= now;
        });

        //     then sort the blogs so that first blog has the most matching categories
        const sortedBlogs = filteredBlogsByDate.sort((a, b) => {
            const aMatchingCategories = a.categories.filter((cat) =>
                categoryIDs.includes(cat.id),
            );
            const bMatchingCategories = b.categories.filter((cat) =>
                categoryIDs.includes(cat.id),
            );
            return bMatchingCategories.length - aMatchingCategories.length;
        });

        //     then remove the current blog from the list
        const filteredBlogsWithoutCurrent = sortedBlogs.filter(
            (blog) => blog.id !== blogData.id,
        );

        //     set
        setSimilarBlogs(filteredBlogsWithoutCurrent);
    }, [blogData, blogs, id]);

    useEffect(() => {
        const observer = new MutationObserver((mutationsList, observer) => {
            // Look through all mutations that just occured
            for (let mutation of mutationsList) {
                // If the addedNodes property has one or more nodes
                if (mutation.addedNodes.length) {
                    const similarsRow = similarsRowRef.current;
                    if (similarsRow) {
                        const handleScroll = () => {
                            const isAtMaxRight =
                                similarsRow.scrollLeft +
                                    similarsRow.clientWidth >=
                                similarsRow.scrollWidth - 200;
                            const isAtMaxLeft = similarsRow.scrollLeft <= 200;
                            setIsMaxRight(isAtMaxRight);
                            setIsMaxLeft(isAtMaxLeft);
                        };
                        similarsRow.addEventListener("scroll", handleScroll);
                        // Once our observed element has been added, we disconnect the observer
                        observer.disconnect();
                        return () => {
                            similarsRow.removeEventListener(
                                "scroll",
                                handleScroll,
                            );
                        };
                    }
                }
            }
        });
        // Starts listening for changes in the root HTML element of the page
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }, []);

    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            // Look through all mutations that just occured
            for (let mutation of mutationsList) {
                // If the addedNodes property has one or more nodes
                if (mutation.addedNodes.length) {
                    const similarsRow = similarsRowRef.current;
                    if (similarsRow) {
                        const isAtMaxRight =
                            similarsRow.scrollLeft + similarsRow.clientWidth >=
                            similarsRow.scrollWidth - 200;
                        const isAtMaxLeft = similarsRow.scrollLeft <= 200;
                        setIsMaxRight(isAtMaxRight);
                        setIsMaxLeft(isAtMaxLeft);
                    }
                }
            }
        });
        // Starts listening for changes in the root HTML element of the page
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }, []);

    const scrollRight = () => {
        const similarsRow = similarsRowRef.current;
        const scrollAmount = 585;
        similarsRow.scrollTo({
            left: similarsRow.scrollLeft + scrollAmount,
            behavior: "smooth",
        });
    };

    const scrollLeft = () => {
        const similarsRow = similarsRowRef.current;
        const scrollAmount = -585;
        similarsRow.scrollTo({
            left: similarsRow.scrollLeft + scrollAmount,
            behavior: "smooth",
        });
    };

    function convertDateString(inputDateString) {
        const [year, month, day] = inputDateString.split("-");
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="blog-view-column">
            <LeftArrowIcon
                className="left-arrow-icon"
                onClick={() => window.history.back()}
            />
            <BlogItem
                categories={blogData.categories}
                title={blogData.title}
                description={blogData.description}
                image={blogData.image}
                date={convertDateString(blogData.publish_date)}
                author={blogData.author}
                email={blogData.email}
                fullScale={true}
            />
            {similarBlogs.length !== 0 && (
                <div className="similars-container">
                    <div className="similars-header">
                        <h2>მსგავსი სტატიები</h2>
                        <div className="scroll-buttons">
                            <LeftArrowIcon
                                className={`left-scroll-icon ${
                                    !isMaxLeft && "max-scroll-reached"
                                }`}
                                onClick={scrollLeft}
                            />
                            <LeftArrowIcon
                                className={`right-scroll-icon ${
                                    !isMaxRight && "max-scroll-reached"
                                }`}
                                style={{ transform: "rotate(180deg)" }}
                                onClick={scrollRight}
                            />
                        </div>
                    </div>
                    {
                        <div className="similars-row" ref={similarsRowRef}>
                            {similarBlogs.map((blog) => (
                                <BlogItem
                                    key={blog.id}
                                    id={blog.id}
                                    image={blog.image}
                                    title={blog.title}
                                    date={convertDateString(blog.publish_date)}
                                    author={blog.author}
                                    description={blog.description}
                                    categories={blog.categories}
                                    fullScale={false}
                                    email={blog.email}
                                />
                            ))}
                        </div>
                    }
                    <div className="similars-row"></div>
                </div>
            )}
        </div>
    );
}

export default ViewBlog;
