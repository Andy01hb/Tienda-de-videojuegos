import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Using react-icons for the cart icon
import { Context } from "../store/appContext";
import "../../styles/home.css"; // Or use a dedicated navbar CSS file if preferred

export const Navbar = () => {
  // Get the global state from context. It's assumed "cartItems" is stored in the context.
  const { store } = useContext(Context);
  const cartCount = store.cartItems ? store.cartItems.length : 0;

  return (
    <header className="header">
      <div className="container header-container">
        {/* The logo is now wrapped in a Link so it acts as a button redirecting to Home */}
        <Link to="/" className="logo-link">
          <h1 className="logo">Video Game Store</h1>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gamelist">Games</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {/* Cart Icon with Badge */}
            <li className="cart-icon">
              <Link to="/cart">
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
