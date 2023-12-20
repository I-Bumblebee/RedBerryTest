import './Navbar.css'
import { ReactComponent as RedBerryLogo } from '../../assets/red-berry-logo.svg'

function Navbar() {
    return (
        <div className="navbar">
            <h3 className="navbar-title">Navbar Title</h3>
            <p className="navbar-description">Navbar Description</p>
            <RedBerryLogo />
        </div>
    )
}

export default Navbar
