import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/cart.css";

const Cart = () => {
  const { store, actions } = useContext(Context);
  const cartItems = store.cartItems;
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    actions.updateCartItem(id, newQuantity);
  };

  const removeItem = (id) => {
    actions.removeFromCart(id);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = appliedCoupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setAppliedCoupon("SAVE10");
    } else {
      alert("Código de cupón inválido");
      setAppliedCoupon(null);
    }
  };

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p>
            Tu carrito está vacío. <Link to="/gamelist">Ver juegos</Link>
          </p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Juego</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image_url || item.imageUrl || "https://via.placeholder.com/150"}
                        alt={item.title}
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeItem(item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Código de cupón"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon}>Aplicar Cupón</button>
              {appliedCoupon && (
                <p className="coupon-applied">
                  Cupón aplicado: {appliedCoupon}
                </p>
              )}
            </div>
            <div className="summary">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              {appliedCoupon && <p>Descuento: -${discount.toFixed(2)}</p>}
              <h2>Total: ${total.toFixed(2)}</h2>
              <button className="checkout-btn" onClick={proceedToCheckout}>
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
