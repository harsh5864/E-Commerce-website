import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar({ cartCount, searchQuery, onSearchChange }) {
    return (
        <nav className="navbar">
            <Link className="brand" to={"/"}>
                <span className="brand-mark">M</span>
                <span className="brand-word">Market<span className="brand-dot">.</span></span>
            </Link>

            <div className="search-section">
                <button className="search-button" type="button" aria-label="Search">
                    <img className="search-icon" src="src/assets/search.svg" alt="" />
                </button>

                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for products, brands and more"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="navbar-links">
                <Link className="link" to={"/"}>Shop</Link>
                <Link className="link link-cart" to={"/cart"}>
                    Cart
                    <span className={`cart-count ${cartCount > 0 ? "cart-count-active" : ""}`}>{cartCount}</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
