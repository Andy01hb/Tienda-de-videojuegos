import React, { useState } from "react";
import "../../styles/profile.css";

export const Profile = () => {
  // Dummy data for purchase history
  const dummyPurchaseHistory = [
    { id: 1, date: "2023-01-15", title: "The Legend of React", amount: 59.99 },
    { id: 2, date: "2023-02-10", title: "React Racing", amount: 49.99 },
  ];

  // Dummy data for game library (purchased games)
  const dummyLibrary = [
    { id: 1, title: "The Legend of React", downloadLink: "#", code: "ABC123" },
    { id: 2, title: "React Racing", downloadLink: "#", code: "XYZ456" },
  ];

  // Dummy data for wishlist (saved games)
  const dummyWishlist = [
    { id: 1, title: "Redux Rampage", imageUrl: "https://via.placeholder.com/150x100?text=Redux+Rampage" },
    { id: 2, title: "React Quest", imageUrl: "https://via.placeholder.com/150x100?text=React+Quest" },
  ];

  // Dummy account settings data (initial values)
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("********");
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de Crédito");

  // Handler for submitting account settings (for demonstration purposes)
  const handleAccountUpdate = (e) => {
    e.preventDefault();
    alert("Configuración actualizada.");
    // In a real app, you'd send the updated data to the backend here.
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Perfil de Usuario</h1>

        {/* Historial de Compras */}
        <section className="purchase-history">
          <h2>Historial de Compras</h2>
          {dummyPurchaseHistory.length === 0 ? (
            <p>No has realizado ninguna compra.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Juego</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {dummyPurchaseHistory.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>{purchase.date}</td>
                    <td>{purchase.title}</td>
                    <td>${purchase.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Biblioteca de Juegos */}
        <section className="game-library">
          <h2>Biblioteca de Juegos</h2>
          {dummyLibrary.length === 0 ? (
            <p>No tienes juegos en tu biblioteca.</p>
          ) : (
            <div className="library-grid">
              {dummyLibrary.map((game) => (
                <div key={game.id} className="library-item">
                  <h3>{game.title}</h3>
                  <p>
                    Enlace de Descarga: <a href={game.downloadLink}>Descargar</a>
                  </p>
                  <p>
                    Código: <strong>{game.code}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Configuración de Cuenta */}
        <section className="account-settings">
          <h2>Configuración de Cuenta</h2>
          <form className="settings-form" onSubmit={handleAccountUpdate}>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Método de Pago:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                <option value="PayPal">PayPal</option>
                <option value="Criptomonedas">Criptomonedas</option>
              </select>
            </div>
            <button type="submit" className="update-btn">
              Actualizar Configuración
            </button>
          </form>
        </section>

        {/* Lista de Deseos */}
        <section className="wishlist">
          <h2>Lista de Deseos</h2>
          {dummyWishlist.length === 0 ? (
            <p>No tienes juegos en tu lista de deseos.</p>
          ) : (
            <div className="wishlist-grid">
              {dummyWishlist.map((game) => (
                <div key={game.id} className="wishlist-item">
                  <img src={game.imageUrl} alt={game.title} />
                  <h3>{game.title}</h3>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
