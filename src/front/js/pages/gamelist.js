import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/gamelist.css";

const GameList = () => {
  const { store, actions } = useContext(Context);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  useEffect(() => {
    // Use the centralized action to fetch products from the API and store them globally
    actions.getProducts();
  }, [actions]);

  // If products are not loaded yet or empty, display a loading message
  if (!store.products || store.products.length === 0) {
    return <p>Cargando juegos...</p>;
  }

  // Generate a list of distinct categories from the fetched products (ignoring empty values)
  const categories = Array.from(
    new Set(store.products.map((game) => game.category).filter(Boolean))
  );

  // Filter the products based on the user-selected criteria
  const filteredGames = store.products.filter((game) => {
    const matchesQuery = game.title.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCategory = filterCategory ? game.category === filterCategory : true;
    const matchesMinPrice = filterMinPrice ? game.price >= parseFloat(filterMinPrice) : true;
    const matchesMaxPrice = filterMaxPrice ? game.price <= parseFloat(filterMaxPrice) : true;
    return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="game-list">
      <h1>Lista de Juegos</h1>

      {/* Filters Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas las Categorías</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio mínimo"
          value={filterMinPrice}
          onChange={(e) => setFilterMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={filterMaxPrice}
          onChange={(e) => setFilterMaxPrice(e.target.value)}
        />
      </div>

      {/* Games List */}
      <div className="games-container">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <img
                src={game.image_url || "https://via.placeholder.com/150"}
                alt={game.title}
                className="game-image"
              />
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <p>Precio: ${game.price.toFixed(2)}</p>
              <button className="buy-btn">Comprar</button>
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
