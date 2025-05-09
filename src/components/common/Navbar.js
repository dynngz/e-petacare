import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import CartDrawer from "../CartDrawer";
import { useState } from 'react';

export default function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    return (
        <header className="navbar-container">
            <nav className="main-nav">
                <div className="nav-left">
                    <Link to="/lookbook" className="nav-link">LOOKBOOK</Link>
                    <Link to="/adopt" className="nav-link">ADOPT</Link>
                </div>
                
                <div className="nav-center">
                    <Link to="/" className="logo-link">PETACARE</Link>
                </div>
                
                <div className="nav-right">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    <button onClick={() => setIsCartOpen(true)} className="cart-button" aria-label="Open cart">
                        CART <span className="cart-count">{cartCount}</span>
                    </button>
                    {isAuthenticated ? (
                        <button onClick={logout} className="nav-link">SIGN OUT</button>
                    ) : (
                        <Link to="/signin" className="nav-link">SIGN IN</Link>
                    )}
                </div>
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}