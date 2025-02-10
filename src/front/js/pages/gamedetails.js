import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/gamedetails.css";

const GameDetails = () => {
  const { store, actions } = useContext(Context);
  const { theid } = useParams();
  const gameId = parseInt(theid);

  // Si la lista de productos aún no se ha cargado, se invoca la acción para obtenerlos.
  useEffect(() => {
    if (!store.products || store.products.length === 0) {
      actions.getProducts();
    }
  }, [store.products, actions]);

  // Se busca el producto con el id correspondiente
  const product = store.products.find((p) => p.id === gameId);

  if (!product) {
    return (
      <div className="gamedetails-page">
        <div className="container">
          <h1>Juego No Encontrado</h1>
          <p>El juego que buscas no existe.</p>
        </div>
      </div>
    );
  }

  // Calcula el precio final en caso de que haya un descuento (se asume que product.discount es un número entre 0 y 1)
  const finalPrice =
    product.discount && product.discount > 0
      ? (product.price * (1 - product.discount)).toFixed(2)
      : product.price.toFixed(2);

  return (
    <div className="gamedetails-page">
      <div className="container">
        {/* Sección del encabezado con imagen de portada y, si existe, galería */}
        <div className="game-header">
          <img
            className="cover-image"
            src={product.image_url}
            alt={product.title}
          />
          {product.gallery && product.gallery.length > 0 && (
            <div className="gallery">
              {product.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detalles del juego */}
        <div className="game-details">
          <h1>{product.title}</h1>
          <p className="description">{product.description}</p>
          {product.systemRequirements && (
            <>
              <h3>Requisitos del Sistema</h3>
              <p className="requirements">{product.systemRequirements}</p>
            </>
          )}
          {product.features && product.features.length > 0 && (
            <>
              <h3>Características</h3>
              <ul className="features">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Sección de compra */}
        <div className="purchase-section">
          <div className="price-info">
            {product.discount && product.discount > 0 ? (
              <>
                <span className="original-price">
                  ${product.price.toFixed(2)}
                </span>
                <span className="discounted-price">${finalPrice}</span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="purchase-actions">
            <button className="buy-btn">Comprar Ahora</button>
            <button className="wishlist-btn">Agregar a Lista de Deseos</button>
          </div>
        </div>

        {/* Reseñas del juego */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="reviews-section">
            <h2>Reseñas de Jugadores</h2>
            <div className="reviews">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <p className="review-user">{review.user}</p>
                  <p className="review-comment">"{review.comment}"</p>
                  <p className="review-rating">
                    Rating: {review.rating} / 5
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Etiquetas relacionadas */}
        {product.tags && product.tags.length > 0 && (
          <div className="tags-section">
            <h3>Etiquetas Relacionadas</h3>
            <div className="tags">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
