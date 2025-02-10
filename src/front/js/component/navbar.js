import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaRegHeart } from "react-icons/fa"; // Se agrega FaRegHeart para el corazón
import { Context } from "../store/appContext";
import "../../styles/navbar.css"; 

export const Navbar = () => {
  const { store } = useContext(Context);
  const cartCount = store.cartItems ? store.cartItems.length : 0;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowProfileOptions(false);
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <h1 className="logo">Andy's Games</h1>
        </Link>
        <nav className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/gamelist" onClick={closeMobileMenu}>Games</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
            </li>
            <li className="profile-icon">
              {store.user ? (
                <Link to="/profile" onClick={closeMobileMenu}>
                  <FaUser />
                </Link>
              ) : (
                <div className="profile-dropdown">
                  <button onClick={toggleProfileOptions} className="profile-btn">
                    <FaUser />
                  </button>
                  {showProfileOptions && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={closeMobileMenu}>Register</Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </li>
            {/* Nuevo ícono de wishlist */}
            <li className="wishlist-icon">
              <Link to="/wishlist" onClick={closeMobileMenu}>
                <FaRegHeart />
              </Link>
            </li>
            <li className="cart-icon">
              <Link to="/cart" onClick={closeMobileMenu}>
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
