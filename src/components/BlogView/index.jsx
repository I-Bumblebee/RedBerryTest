import './BlogView.css'
import { useParams } from "react-router-dom";

function ViewBlog() {
    const { id } = useParams();

    // Now you can use the id to fetch the blog post and display it

    return (
        <div>
            {/* Display your blog post here */}
            {id}
        </div>
    );
}

export default ViewBlog;
