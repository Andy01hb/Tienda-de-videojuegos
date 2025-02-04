import React, { useState } from "react";
import "../../styles/contact.css";

export const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías el formulario a tu backend
    alert("Mensaje enviado. ¡Gracias por contactarnos!");
    // Limpiar campos
    setNombre("");
    setCorreo("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>¿Tienes dudas? ¡Contáctanos!</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Asunto:</label>
            <input
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mensaje:</label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="send-btn">
            Enviar
          </button>
        </form>

        <div className="contact-info">
          <h2>Información de Contacto</h2>
          <p><strong>Correo:</strong> contacto@tiendavideojuegos.com</p>
          <p><strong>Teléfono:</strong> +123 456 7890</p>
          <div className="social-media">
            <a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <div className="faq">
            <h3>Preguntas Frecuentes</h3>
            <ul>
              <li>
                <strong>¿Cuánto tiempo tarda en llegar mi código de activación?</strong>
                &nbsp;Tu código se entrega al instante después de la compra.
              </li>
              <li>
                <strong>¿Puedo pedir un reembolso?</strong>
                &nbsp;Sí, bajo nuestras políticas de reembolso.
              </li>
              <li>
                <strong>¿Qué métodos de pago aceptan?</strong>
                &nbsp;Aceptamos tarjeta de crédito, PayPal y criptomonedas.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
