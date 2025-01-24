import "./Header.css"
import SearchBar from "../SearchBar/SearchBar";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";


const Header = () => {
    const { userName } = useContext(UserContext);

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
            {userName && <p className="user-greetings">
                Welcome, {userName}
            </p>}
            <ul>
                <li><a href="#"> Logout</a></li>
            </ul>

        </header>
    
    );
}

export default Header;
