import './Home.css'
import HeaderImage from '../../assets/header-image.png'

function Home() {
    return (
        <div className="home">
            <h3 className="home-title">Home Title</h3>
            <p className="home-description">Home Description</p>
            <img className="home-image" src={HeaderImage} alt="Header" />
        </div>
    )
}

export default Home