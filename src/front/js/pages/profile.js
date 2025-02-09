import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  // UPDATED: Use backend data for purchase history and library instead of dummy data
  // Previously, dummy data was used here.
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [library, setLibrary] = useState([]);

  // For wishlist, we now fetch from the backend
  const [wishlist, setWishlist] = useState([]);

  // Account settings state, initially from store.user if available
  const [email, setEmail] = useState(store.user ? store.user.email : "user@example.com");
  const [password, setPassword] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    store.user && store.user.paymentMethod ? store.user.paymentMethod : "Tarjeta de Crédito"
  );

  // Fetch wishlist from the backend when the component mounts or when store.token changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (store.token) {
        const data = await actions.getWishlist();
        if (data) {
          setWishlist(data);
        }
      }
    };
    fetchWishlist();
  }, [store.token, actions]);

  // NEW: Fetch purchase history (orders) and library from the backend when the component mounts or when store.token changes
  useEffect(() => {
    const fetchOrdersAndLibrary = async () => {
      if (store.token) {
        const ordersData = await actions.getOrders();
        if (ordersData) {
          setPurchaseHistory(ordersData);
        }
        const libraryData = await actions.getLibrary();
        if (libraryData) {
          setLibrary(libraryData);
        }
      }
    };
    fetchOrdersAndLibrary();
  }, [store.token, actions]);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    // Prepare the updated data
    const updatedData = {
      email: email,
      password: password, // if empty, backend can choose to ignore password update
      paymentMethod: paymentMethod
    };
    // Call the updateUser action from flux
    const result = await actions.updateUser(updatedData);
    if (result) {
      alert("Configuración actualizada.");
    } else {
      alert("Error actualizando la configuración.");
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Perfil de Usuario</h1>

        {/* Historial de Compras */}
        <section className="purchase-history">
          <h2>Historial de Compras</h2>
          {purchaseHistory.length === 0 ? (
            <p>No has realizado ninguna compra.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.order_date).toLocaleString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Biblioteca de Juegos */}
        <section className="game-library">
          <h2>Biblioteca de Juegos</h2>
          {library.length === 0 ? (
            <p>No tienes juegos en tu biblioteca.</p>
          ) : (
            <div className="library-grid">
              {library.map((item) => (
                <div key={item.id} className="library-item">
                  <h3>{item.product?.title}</h3>
                  <p>
                    Enlace de Descarga: <a href="#">Descargar</a>
                  </p>
                  <p>
                    Código: <strong>{item.download_code}</strong>
                  </p>
                  <p>
                    Fecha de Compra: {new Date(item.purchase_date).toLocaleDateString()}
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
                placeholder="Nueva contraseña"
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
          {wishlist.length === 0 ? (
            <p>No tienes juegos en tu lista de deseos.</p>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <img
                    src={item.product?.image_url || "https://via.placeholder.com/150x100"}
                    alt={item.product?.title}
                  />
                  <h3>{item.product?.title}</h3>
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
