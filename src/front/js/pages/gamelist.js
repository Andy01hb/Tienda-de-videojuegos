import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/gamelist.css";

export const GameList = () => {
  // Dummy data for the games
  const dummyGames = [
    {
      id: 1,
      title: "The Legend of React",
      imageUrl:
        "https://wpassets.halowaypoint.com/wp-content/2022/02/Halo-Infinite-Chief-Weapon-scaled.jpg",
      price: 59.99,
      rating: 4.5,
      genre: "Action",
      developer: "Bungie",
      platform: "PC",
      popularity: 100,
    },
    {
      id: 2,
      title: "React Racing",
      imageUrl:
        "https://store-images.s-microsoft.com/image/apps.58021.69011092827716296.e9190db7-6f4c-478c-8555-3edad4336a39.de8bb314-af23-4670-9343-fa78251591c8?q=90&w=480&h=270",
      price: 49.99,
      rating: 4.0,
      genre: "Racing",
      developer: "EA",
      platform: "Xbox",
      popularity: 80,
    },
    {
      id: 3,
      title: "Redux Rampage",
      imageUrl:
        "https://play-lh.googleusercontent.com/HXoSbz87wD8eUFnDkBKoQfe5oeo8HZXEsnQfYCNREy_tsqHheVcT6dKcUaXpSE2r6Q=w526-h296-rw",
      price: 39.99,
      rating: 4.2,
      genre: "Action",
      developer: "Ubisoft",
      platform: "PlayStation",
      popularity: 90,
    },
    {
      id: 4,
      title: "React Quest",
      imageUrl: "https://via.placeholder.com/300x200?text=React+Quest",
      price: 29.99,
      rating: 3.8,
      genre: "Adventure",
      developer: "Indie Studio",
      platform: "PC",
      popularity: 70,
    },
    {
      id: 5,
      title: "State Saga",
      imageUrl: "https://via.placeholder.com/300x200?text=State+Saga",
      price: 19.99,
      rating: 4.7,
      genre: "RPG",
      developer: "Square Enix",
      platform: "PC",
      popularity: 110,
    },
    {
      id: 6,
      title: "Context Clash",
      imageUrl: "https://via.placeholder.com/300x200?text=Context+Clash",
      price: 24.99,
      rating: 4.1,
      genre: "Strategy",
      developer: "Paradox",
      platform: "PC",
      popularity: 60,
    },
  ];

  // State for filters, sorting and view mode (if needed)
  const [genreFilter, setGenreFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [developerFilter, setDeveloperFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Filtering logic
  const filteredGames = dummyGames.filter((game) => {
    let genreMatch = genreFilter ? game.genre === genreFilter : true;
    let developerMatch = developerFilter ? game.developer === developerFilter : true;
    let platformMatch = platformFilter ? game.platform === platformFilter : true;
    let priceMatch = true;
    if (priceFilter === "under20") {
      priceMatch = game.price < 20;
    } else if (priceFilter === "20to50") {
      priceMatch = game.price >= 20 && game.price <= 50;
    } else if (priceFilter === "above50") {
      priceMatch = game.price > 50;
    }
    return genreMatch && developerMatch && platformMatch && priceMatch;
  });

  // Sorting logic
  let sortedGames = [...filteredGames];
  if (sortOrder === "priceAsc") {
    sortedGames.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "priceDesc") {
    sortedGames.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "bestSelling") {
    sortedGames.sort((a, b) => b.popularity - a.popularity);
  } else if (sortOrder === "bestRated") {
    sortedGames.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="gamelist-page">
      <div className="container">
        <h1>Catálogo de Juegos</h1>
        <div className="filters">
          {/* Filters UI here */}
          <div className="filter-group">
            <label htmlFor="genre">Género:</label>
            <select
              id="genre"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Action">Action</option>
              <option value="Racing">Racing</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="price">Precio:</label>
            <select
              id="price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="under20">Menos de $20</option>
              <option value="20to50">$20 - $50</option>
              <option value="above50">Más de $50</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="developer">Desarrollador:</label>
            <select
              id="developer"
              value={developerFilter}
              onChange={(e) => setDeveloperFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Bungie">Bungie</option>
              <option value="EA">EA</option>
              <option value="Ubisoft">Ubisoft</option>
              <option value="Indie Studio">Indie Studio</option>
              <option value="Square Enix">Square Enix</option>
              <option value="Paradox">Paradox</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="platform">Plataforma:</label>
            <select
              id="platform"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort">Ordenar Por:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Ninguno</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="bestSelling">Más vendidos</option>
              <option value="bestRated">Mejor valorados</option>
            </select>
          </div>
          <div className="view-toggle">
            <label>Vista:</label>
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              Cuadrícula
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              Lista
            </button>
          </div>
        </div>

        {/* Games display */}
        <div className={`games-container ${viewMode}`}>
          {sortedGames.length > 0 ? (
            sortedGames.map((game) => (
              <div key={game.id} className="game-item">
                {/* Wrap the entire card in a Link so clicking navigates to the details page */}
                <Link to={`/gamedetails/${game.id}`}>
                  <img src={game.imageUrl} alt={game.title} />
                  <div className="game-info">
                    <h3>{game.title}</h3>
                    <p className="price">${game.price.toFixed(2)}</p>
                    <p className="rating">Rating: {game.rating} / 5</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No se encontraron juegos con los filtros seleccionados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameList;
