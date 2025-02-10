import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FaRegHeart, FaHeart, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/gamelist.css";

const GameList = () => {
  const { store, actions } = useContext(Context);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [wishlistMap, setWishlistMap] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (store.products.length === 0) {
      actions.getProducts();
    }
  }, [store.products, actions]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (store.token) {
        const wishlistData = await actions.getWishlist();
        if (wishlistData && Array.isArray(wishlistData)) {
          const map = {};
          wishlistData.forEach((item) => {
            if (item.product && item.product.id) {
              map[item.product.id] = item.id;
            }
          });
          setWishlistMap(map);
        }
      }
    };
    fetchWishlist();
  }, [store.token, actions]);

  const categories = Array.from(
    new Set(store.products.map((product) => product.category).filter(Boolean))
  );

  const filteredGames = store.products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesMinPrice = filterMinPrice ? product.price >= parseFloat(filterMinPrice) : true;
    const matchesMaxPrice = filterMaxPrice ? product.price <= parseFloat(filterMaxPrice) : true;
    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Función para hacer toggle en el carrito
  const toggleCart = (product) => {
    const inCart = store.cartItems.some((item) => item.id === product.id);
    if (inCart) {
      actions.removeFromCart(product.id);
    } else {
      actions.addToCart(product, 1);
    }
  };

  // Función para togglear la wishlist (ya implementada)
  const toggleWishlist = async (product) => {
    if (!store.token) {
      navigate("/register");
      return;
    }
    if (wishlistMap[product.id]) {
      const wishlistItemId = wishlistMap[product.id];
      const result = await actions.removeFromWishlist(wishlistItemId);
      if (result) {
        const newMap = { ...wishlistMap };
        delete newMap[product.id];
        setWishlistMap(newMap);
      }
    } else {
      const result = await actions.addToWishlist(product.id);
      if (result && result.id) {
        setWishlistMap({ ...wishlistMap, [product.id]: result.id });
      }
    }
  };

  return (
    <div className="game-list">
      <h1>Lista de Juegos</h1>
      <div className="filters">
        {/* Filtros: Buscar, Categoría, Precio Mínimo y Máximo */}
        <div className="filter-group">
          <label>Buscar</label>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Categoría</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Precio Mínimo</label>
          <input
            type="number"
            placeholder="Precio mínimo"
            value={filterMinPrice}
            onChange={(e) => setFilterMinPrice(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Precio Máximo</label>
          <input
            type="number"
            placeholder="Precio máximo"
            value={filterMaxPrice}
            onChange={(e) => setFilterMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="games-container">
        {filteredGames.length > 0 ? (
          filteredGames.map((product) => {
            const inCart = store.cartItems.some((item) => item.id === product.id);
            return (
              <div key={product.id} className="game-card">
                <Link to={`/gamedetails/${product.id}`} className="game-link">
                  <img
                    src={product.image_url || "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="game-image"
                  />
                  <h3>{product.title}</h3>
                </Link>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="actions">
                  <button
                    className={`cart-toggle-btn ${inCart ? "added" : ""}`}
                    onClick={() => toggleCart(product)}
                  >
                    {inCart ? <FaCheck /> : "Add to Cart"}
                  </button>
                  <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                    {wishlistMap[product.id] ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay juegos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export { GameList };
