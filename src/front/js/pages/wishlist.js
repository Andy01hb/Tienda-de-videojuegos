import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/wishlist.css";

const Wishlist = () => {
  const { store, actions } = useContext(Context);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Se obtiene la wishlist del backend al montar el componente
  useEffect(() => {
    const fetchWishlist = async () => {
      if (store.token) {
        const data = await actions.getWishlist();
        if (data) setWishlistItems(data);
      }
    };
    fetchWishlist();
  }, [store.token, actions]);

  // Función para eliminar un elemento de la wishlist
  const handleRemove = async (itemId) => {
    const result = await actions.removeFromWishlist(itemId);
    if (result) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
      setWishlistItems(updatedWishlist);
    }
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>Lista de Deseos</h1>
        {wishlistItems.length === 0 ? (
          <p>
            No tienes elementos en tu lista de deseos. <Link to="/gamelist">Ver juegos</Link>
          </p>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.product?.image_url || "https://via.placeholder.com/150"}
                  alt={item.product?.title}
                />
                <h3>{item.product?.title}</h3>
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
