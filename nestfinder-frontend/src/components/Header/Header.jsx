import "./Header.css"
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {

    return (
        <header>
            <div className="header-section">
                <img src="../nestfinder.png" alt="header-logo" />
                <SearchBar/>
                <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
                </nav>
            </div>
            
        </header>
    
    );
}

export default Header;