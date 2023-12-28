import "./Home.css";
import HeaderImage from "../../assets/header-image.png";
import { useEffect, useState } from "react";
import CatItem from "./CatItem";
import BlogItem from "../BlogItem";

function Home({categories, blogs}) {
    const [selectedCats, setSelectedCats] = useState([]);

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {


        // Retrieve selectedCats from localStorage
        const selectedCatsFromLocalStorage = JSON.parse(
            localStorage.getItem("selectedCats") || "[]",
        );
        if (selectedCatsFromLocalStorage) {
            setSelectedCats(selectedCatsFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        const filteredData = blogs.filter((blog) => {
            const blogDate = new Date(blog.publish_date);
            const now = new Date();
            const isDateValid = blogDate <= now;

            // Check if at least one of the selected category IDs is in the blog's categories
            const selectedCatsIDs = selectedCats.map((cat) => cat.id);
            const hasMatchingCategory =
                selectedCats.length === 0 ||
                blog.categories.some((category) =>
                    selectedCatsIDs.includes(category.id),
                );
            return isDateValid && hasMatchingCategory;
        });

        setFilteredBlogs(filteredData);
    }, [selectedCats, blogs]);

    useEffect(() => {
        //     store selectedCats in localStorage
        localStorage.setItem("selectedCats", JSON.stringify(selectedCats));
    }, [selectedCats]);

    const handleCatClick = (cat) => {
        const foundCat = selectedCats.find((c) => c.id === cat.id);
        if (foundCat) {
            setSelectedCats(selectedCats.filter((c) => c.id !== cat.id));
        } else {
            setSelectedCats([...selectedCats, cat]);
        }
    };

    function convertDateString(inputDateString) {
        const [year, month, day] = inputDateString.split("-");
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="home">
            <div className="home-header">
                <h1>ბლოგი</h1>
                <img src={HeaderImage} alt="Header Decoration" />
            </div>
            <div className="categories-row">
                {categories.map((cat) => (
                    <CatItem
                        key={cat.id}
                        id={cat.id}
                        title={cat.title}
                        background_color={cat.background_color}
                        selected={
                            selectedCats.find((c) => c.id === cat.id) !==
                            undefined
                        }
                        onClick={() => handleCatClick(cat)}
                    />
                ))}
            </div>
            <div className="blog-posts">
                {filteredBlogs.map((blog) => (
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
        </div>
    );
}

export default Home;
