import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Importamos ambos íconos
import "../../styles/gamelist.css";

const GameList = () => {
  const { store, actions } = useContext(Context);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  
  // Estado local para almacenar un objeto que mapea el ID del producto al ID del elemento en la wishlist.
  const [wishlistMap, setWishlistMap] = useState({});

  // Obtiene la lista de productos desde el backend si aún no está cargada
  useEffect(() => {
    if (store.products.length === 0) {
      actions.getProducts();
    }
  }, [store.products, actions]);

  // Al montar (y cuando cambia el token), se consulta la wishlist y se construye el mapa:
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

  // Genera la lista de categorías únicas
  const categories = Array.from(
    new Set(store.products.map((product) => product.category).filter(Boolean))
  );

  // Filtrado de productos según los criterios ingresados
  const filteredGames = store.products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesMinPrice = filterMinPrice ? product.price >= parseFloat(filterMinPrice) : true;
    const matchesMaxPrice = filterMaxPrice ? product.price <= parseFloat(filterMaxPrice) : true;
    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    actions.addToCart(product, 1);
  };

  // Función toggle para la wishlist:
  // Si el producto ya está en la wishlist (presente en wishlistMap) se elimina,
  // de lo contrario, se agrega.
  const toggleWishlist = async (product) => {
    if (wishlistMap[product.id]) {
      // El producto ya está en la wishlist; se elimina.
      const wishlistItemId = wishlistMap[product.id];
      const result = await actions.removeFromWishlist(wishlistItemId);
      if (result) {
        // Actualizamos el mapa eliminando la entrada del producto.
        const newMap = { ...wishlistMap };
        delete newMap[product.id];
        setWishlistMap(newMap);
      }
    } else {
      // El producto no está en la wishlist; se agrega.
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
              <img
                src={product.image_url || "https://via.placeholder.com/150"}
                alt={product.title}
                className="game-image"
              />
              <div className="game-info">
                <h3>{product.title}</h3>
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
