import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  // Local state for dynamic home page sections
  const [promotions, setPromotions] = useState([]);
  const [discountOffers, setDiscountOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch recommended games from global products.
  // We assume actions.getProducts() has been called elsewhere or we can call it here.
  useEffect(() => {
    if (store.products.length === 0) {
      actions.getProducts();
    }
    // Fetch dynamic home page data
    const fetchHomeData = async () => {
      const promos = await actions.getPromotions();
      if (promos) setPromotions(promos);

      const discounts = await actions.getDiscountOffers();
      if (discounts) setDiscountOffers(discounts);

      const testis = await actions.getTestimonials();
      if (testis) setTestimonials(testis);
    };
    fetchHomeData();
  }, [store.products, actions]);

  // Derive recommended games and popular categories from products
  const recommendedGames = store.products;
  const popularCategories = Array.from(
    new Set(store.products.map((product) => product.category).filter(Boolean))
  ).map((cat, index) => ({ id: index, name: cat }));

  // LimitedOfferCounter Component for Countdown Timer (same as before)
  const LimitedOfferCounter = ({ expiresAt }) => {
    const calculateTimeLeft = () => {
      const difference = +new Date(expiresAt) - +new Date();
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / (1000 * 60)) % 60),
          secs: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [expiresAt]);

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });

    return (
      <div className="counter">
        {timerComponents.length ? timerComponents : <span>Oferta finalizada</span>}
      </div>
    );
  };

  return (
    <div className="home">
      {/* Banner / Hero Section using dynamic promotions if available */}
      {promotions.length > 0 ? (
        <section className="banner">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="promo-banner"
              style={{ backgroundImage: `url(${promo.imageUrl})` }}
            >
              <div className="promo-content">
                <h1>{promo.title}</h1>
                <p>{promo.description}</p>
                <button className="promo-btn">Ver más</button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="hero">
          <div className="container hero-container">
            <h2>Welcome to the Ultimate Video Game Store!</h2>
            <p>
              Discover your next adventure among our latest game releases.
            </p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </section>
      )}

      {/* Recommended Games Section */}
      <section id="games" className="featured-games">
        <div className="container">
          <h2>Juegos Recomendados</h2>
          <div className="game-grid">
            {recommendedGames.length > 0 ? (
              recommendedGames.map((game) => (
                <div key={game.id} className="game-card">
                  <img
                    src={game.image_url || "https://via.placeholder.com/150"}
                    alt={game.title}
                    className="game-image"
                  />
                  <div className="game-details">
                    <h3>{game.title}</h3>
                    <p className="price">${game.price.toFixed(2)}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay juegos disponibles.</p>
            )}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="popular-categories">
        <div className="container">
          <h2>Categorías Populares</h2>
          <div className="categories-grid">
            {popularCategories.map((cat) => (
              <div key={cat.id} className="category-card">
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discount Offers Section */}
      <section className="discount-offers">
        <div className="container">
          <h2>Descuentos y Ofertas</h2>
          <div className="offers-grid">
            {discountOffers.length > 0 ? (
              discountOffers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <img src={offer.imageUrl} alt={offer.title} />
                  <h3>{offer.title}</h3>
                  <LimitedOfferCounter expiresAt={offer.expiresAt} />
                  <button className="btn">Aprovechar Oferta</button>
                </div>
              ))
            ) : (
              <p>No hay ofertas disponibles.</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>Testimonios</h2>
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <p className="comment">"{testimonial.comment}"</p>
                  <p className="user">- {testimonial.user}</p>
                  <p className="rating">Rating: {testimonial.rating} / 5</p>
                </div>
              ))
            ) : (
              <p>No hay testimonios.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
