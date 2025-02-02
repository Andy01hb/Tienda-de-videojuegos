import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/cart.css";

const Cart = () => {
  // Dummy cart items (in a real app these would be managed globally)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Legend of React",
      price: 59.99,
      quantity: 1,
      imageUrl:
        "https://wpassets.halowaypoint.com/wp-content/2022/02/Halo-Infinite-Chief-Weapon-scaled.jpg",
    },
    {
      id: 2,
      title: "React Racing",
      price: 49.99,
      quantity: 2,
      imageUrl:
        "https://store-images.s-microsoft.com/image/apps.58021.69011092827716296.e9190db7-6f4c-478c-8555-3edad4336a39.de8bb314-af23-4670-9343-fa78251591c8?q=90&w=480&h=270",
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Update the quantity of an item
  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // For demonstration, let’s say coupon "SAVE10" gives 10% off the subtotal
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

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p>
            Tu carrito está vacío.{" "}
            <Link to="/gamelist">Ver juegos</Link>
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
                      <img src={item.imageUrl} alt={item.title} />
                      <span>{item.title}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      $
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button onClick={() => removeItem(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Coupon Section */}
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

            {/* Summary Section */}
            <div className="summary">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              {appliedCoupon && (
                <p>Descuento: -${discount.toFixed(2)}</p>
              )}
              <h2>Total: ${total.toFixed(2)}</h2>
              <button className="checkout-btn">Proceder al Pago</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
