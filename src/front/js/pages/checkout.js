import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/checkout.css";

export const Checkout = () => {
  // State for payment option: 'guest' or 'account'
  const [paymentOption, setPaymentOption] = useState("guest");
  // Payment method: "card", "paypal", or "crypto"
  const [paymentMethod, setPaymentMethod] = useState("card");
  // For account creation (if selected)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // For guest info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Dummy total (in a real app, get it from your cart context or similar)
  const totalAmount = 100.0;
  // Confirmation code state
  const [confirmationCode, setConfirmationCode] = useState("");
  
  // useNavigate hook for redirection
  const navigate = useNavigate();

  const handleConfirmPurchase = (e) => {
    e.preventDefault();
    // Simulate generating a confirmation code
    const generatedCode =
      "GAME-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setConfirmationCode(generatedCode);
    // In a real app, here you would handle the payment process and then update state accordingly.
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout / Pago</h1>

        {confirmationCode ? (
          <div className="confirmation">
            <h2>¡Compra Confirmada!</h2>
            <p>Gracias por su compra.</p>
            <p>
              Su código de juego es: <strong>{confirmationCode}</strong>
            </p>
            <button onClick={handleBackToHome} className="home-btn">
              Volver a Inicio
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmPurchase} className="checkout-form">
            {/* Payment Option */}
            <div className="payment-option">
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="guest"
                  checked={paymentOption === "guest"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                Pago Rápido (Invitado)
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="account"
                  checked={paymentOption === "account"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                Crear Cuenta
              </label>
            </div>

            {paymentOption === "account" && (
              <div className="account-fields">
                <input
                  type="text"
                  placeholder="Nombre de Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {paymentOption === "guest" && (
              <div className="guest-fields">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Payment Methods */}
            <div className="payment-method">
              <h3>Método de Pago</h3>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Tarjeta
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="crypto"
                  checked={paymentMethod === "crypto"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Criptomonedas
              </label>
            </div>

            {/* Purchase Summary */}
            <div className="summary">
              <h3>Resumen de Compra</h3>
              <p>
                Total a Pagar: <strong>${totalAmount.toFixed(2)}</strong>
              </p>
            </div>

            <button type="submit" className="confirm-btn">
              Confirmar Compra
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
