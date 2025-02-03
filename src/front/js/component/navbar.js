import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa"; // Íconos necesarios
import { Context } from "../store/appContext";
import "../../styles/home.css"; // O un archivo CSS dedicado al navbar

export const Navbar = () => {
  // Accedemos al estado global; se asume que store.cartItems existe
  const { store } = useContext(Context);
  const cartCount = store.cartItems ? store.cartItems.length : 0;

  // Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Esta función cierra el menú móvil al hacer clic en algún enlace
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Ícono de menú móvil (solo visible en dispositivos móviles) */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        {/* Logo, siempre visible, alineado a la izquierda junto al ícono de menú en móviles */}
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <h1 className="logo">Video Game Store</h1>
        </Link>
        {/* Navegación principal */}
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
              <Link to="/profile" onClick={closeMobileMenu}>
                <FaUser />
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
