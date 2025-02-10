import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/gamelist.css";

const GameList = () => {
  const { store, actions } = useContext(Context);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  
  // Local state for mapping product id to wishlist item id
  const [wishlistMap, setWishlistMap] = useState({});

  const navigate = useNavigate();

  // Load products if not loaded already
  useEffect(() => {
    if (store.products.length === 0) {
      actions.getProducts();
    }
  }, [store.products, actions]);

  // Fetch wishlist and create a mapping from product id to wishlist item id
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

  // Generate unique categories from the products
  const categories = Array.from(
    new Set(store.products.map((product) => product.category).filter(Boolean))
  );

  // Filter products based on search, category, and price range
  const filteredGames = store.products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesMinPrice = filterMinPrice ? product.price >= parseFloat(filterMinPrice) : true;
    const matchesMaxPrice = filterMaxPrice ? product.price <= parseFloat(filterMaxPrice) : true;
    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const handleAddToCart = (product) => {
    actions.addToCart(product, 1);
  };

  // Toggle wishlist: if the user is not logged in, redirect them to registration;
  // otherwise, add or remove the product from the wishlist.
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

      <div className="games-container grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((product) => (
            <div key={product.id} className="game-card">
              {/* Wrap image and title in a Link to redirect to game details */}
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
                <button className="buy-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                  {wishlistMap[product.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay juegos disponibles con los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
};

export { GameList };
