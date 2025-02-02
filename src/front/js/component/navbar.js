import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"; // Or import a dedicated navbar CSS file if preferred

export const Navbar = () => {
  // Get the global state from context.
  // It is assumed that "cartItems" is stored in the context.
  const { store } = useContext(Context);
  const cartCount = store.cartItems ? store.cartItems.length : 0;

  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="logo">Video Game Store</h1>
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
                {/* You can replace this emoji with an icon from a library like FontAwesome */}
                🛒
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
