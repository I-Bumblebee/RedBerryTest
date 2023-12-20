import './App.css';
import Navbar from "./components/Navbar";
import AuthProvider from "./contexts/AuthProvider";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <h1>React Blog Post app</h1>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
