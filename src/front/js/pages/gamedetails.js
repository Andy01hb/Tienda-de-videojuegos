import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/gamedetails.css";

export const GameDetails = () => {
  // Extract the game id from the URL parameters
  const { theid } = useParams();
  const gameId = parseInt(theid);

  // Dummy data for the games
  const dummyGames = [
    {
      id: 1,
      title: "The Legend of React",
      coverImage:
        "https://wpassets.halowaypoint.com/wp-content/2022/02/Halo-Infinite-Chief-Weapon-scaled.jpg",
      gallery: [
        "https://via.placeholder.com/600x400?text=Screenshot+1",
        "https://via.placeholder.com/600x400?text=Screenshot+2",
        "https://via.placeholder.com/600x400?text=Screenshot+3",
      ],
      description:
        "Sumérgete en un mundo de aventuras y desafíos en 'The Legend of React'. Este juego combina acción, estrategia y una narrativa envolvente que te mantendrá pegado a la pantalla durante horas.",
      systemRequirements:
        "OS: Windows 10, Processor: Intel i5 o equivalente, Memory: 8GB RAM, Graphics: GTX 1050 o superior.",
      features: [
        "Modo multijugador",
        "Campaña para un jugador",
        "Actualizaciones periódicas",
        "Gráficos de alta calidad",
      ],
      price: 59.99,
      discount: 0.20, // 20% discount
      rating: 4.5,
      reviews: [
        {
          user: "Juan Pérez",
          comment: "Excelente juego, muy entretenido y con una gran historia.",
          rating: 5,
        },
        {
          user: "María Gómez",
          comment: "Muy bueno, aunque se siente un poco corto en contenido.",
          rating: 4,
        },
      ],
      tags: ["Acción", "Aventura", "Multijugador", "Desarrollador: Bungie"],
    },
    {
      id: 2,
      title: "React Racing",
      coverImage:
        "https://store-images.s-microsoft.com/image/apps.58021.69011092827716296.e9190db7-6f4c-478c-8555-3edad4336a39.de8bb314-af23-4670-9343-fa78251591c8?q=90&w=480&h=270",
      gallery: [
        "https://via.placeholder.com/600x400?text=Screenshot+1",
        "https://via.placeholder.com/600x400?text=Screenshot+2",
        "https://via.placeholder.com/600x400?text=Screenshot+3",
      ],
      description:
        "Vive la adrenalina de las carreras en 'React Racing'. Acelera, derrapa y compite en circuitos llenos de desafíos y emociones.",
      systemRequirements:
        "OS: Windows 10, Processor: Intel i5, Memory: 8GB RAM, Graphics: GTX 960 o superior.",
      features: [
        "Carreras multijugador online",
        "Diversos circuitos",
        "Modos de juego variados",
        "Gráficos realistas",
      ],
      price: 49.99,
      discount: 0,
      rating: 4.0,
      reviews: [
        {
          user: "Carlos Ramirez",
          comment: "La emoción de las carreras se siente en cada partida.",
          rating: 4,
        },
      ],
      tags: ["Carreras", "Competitivo", "Multijugador", "Desarrollador: EA"],
    },
    // You can add more dummy games here if needed.
  ];

  // Find the game that matches the id
  const dummyGame = dummyGames.find((game) => game.id === gameId);

  // If no game is found, show a message
  if (!dummyGame) {
    return (
      <div className="gamedetails-page">
        <div className="container">
          <h1>Game Not Found</h1>
          <p>The game you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Calculate final price if discount applies
  const finalPrice = dummyGame.discount
    ? (dummyGame.price * (1 - dummyGame.discount)).toFixed(2)
    : dummyGame.price.toFixed(2);

  return (
    <div className="gamedetails-page">
      <div className="container">
        {/* Cover image and gallery */}
        <div className="game-header">
          <img
            className="cover-image"
            src={dummyGame.coverImage}
            alt={dummyGame.title}
          />
          <div className="gallery">
            {dummyGame.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${dummyGame.title} screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Game details */}
        <div className="game-details">
          <h1>{dummyGame.title}</h1>
          <p className="description">{dummyGame.description}</p>
          <h3>Requisitos del Sistema</h3>
          <p className="requirements">{dummyGame.systemRequirements}</p>
          <h3>Características</h3>
          <ul className="features">
            {dummyGame.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Price and purchase options */}
        <div className="purchase-section">
          <div className="price-info">
            {dummyGame.discount ? (
              <>
                <span className="original-price">
                  ${dummyGame.price.toFixed(2)}
                </span>
                <span className="discounted-price">${finalPrice}</span>
              </>
            ) : (
              <span className="price">${dummyGame.price.toFixed(2)}</span>
            )}
          </div>
          <div className="purchase-actions">
            <button className="buy-btn">Comprar Ahora</button>
            <button className="wishlist-btn">Agregar a Lista de Deseos</button>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2>Reseñas de Jugadores</h2>
          <div className="reviews">
            {dummyGame.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="review-user">{review.user}</p>
                <p className="review-comment">"{review.comment}"</p>
                <p className="review-rating">Rating: {review.rating} / 5</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tags */}
        <div className="tags-section">
          <h3>Etiquetas Relacionadas</h3>
          <div className="tags">
            {dummyGame.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
