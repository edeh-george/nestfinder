import "./Header.css"

const Header = () => {

    return (
        <header>
            <div class="header-section">
                <img src="./nestfinder.png" alt="header-logo" />
                <nav>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="houses/">Home</a></li>
                </ul>
                </nav>
            </div>
            
        </header>
    
    );
}

export default Header;