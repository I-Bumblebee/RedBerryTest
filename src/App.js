import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, HashRouter } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import Home from "./components/Home";
import AuthContext from "./contexts/AuthContext";
import {useContext, useEffect, useState} from "react";
import PrivateRoute from "./util/PrivateRoute";
import BlogView from "./components/BlogView";

function App() {
    const { isSignedIn } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        const token = `ee383d4cbf7503aaf852de7ba37c49d6a3911e1b46002bd9ddc5d9eadaa26889`;

        // Fetch categories
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            "https://api.blog.redberryinternship.ge/api/categories",
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data);
            });

        // Fetch blogs
        const requestOptions2 = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            "https://api.blog.redberryinternship.ge/api/blogs",
            requestOptions2,
        )
            .then((response) => response.json())
            .then((data) => setBlogs(data.data));

    }, []);

    useEffect(() => {
        console.log("isSignedIn: ", isSignedIn);
    }, [isSignedIn]);

    return (
        <HashRouter >
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home categories={categories} blogs={blogs}/>} />
                    <Route
                        path="/post-blog"
                        element={
                            <PrivateRoute>
                                <BlogPost categories={categories} />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/view-blog/:id" element={<BlogView blogs={blogs} />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </HashRouter>

    );
}

export default App;
