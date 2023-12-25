import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import Home from "./components/Home";
import AuthContext from "./contexts/AuthContext";
import { useContext, useEffect } from "react";
import PrivateRoute from "./util/PrivateRoute";
import BlogView from "./components/BlogView";

function App() {
    const { isSignedIn } = useContext(AuthContext);

    useEffect(() => {
        console.log("isSignedIn: ", isSignedIn);
    }, [isSignedIn]);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/post-blog"
                        element={
                            <PrivateRoute>
                                <BlogPost />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/view-blog/:id" element={<BlogView />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
