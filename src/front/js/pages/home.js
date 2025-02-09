import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Íconos de corazón vacío y relleno
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [promotions, setPromotions] = useState([]);
  const [discountOffers, setDiscountOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  // Estado local para mapear los IDs de productos a los IDs de wishlist
  const [wishlistMap, setWishlistMap] = useState({});

  useEffect(() => {
    if (store.products.length === 0) {
      actions.getProducts();
    }
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

  // Al montar, obtenemos la wishlist del backend para actualizar el estado local
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

  // Se muestran los juegos recomendados; se limita a 3 productos.
  const recommendedGames = store.products;
  const recommendedGamesToShow = recommendedGames.slice(0, 3);

  const popularCategories = Array.from(
    new Set(store.products.map((product) => product.category).filter(Boolean))
  ).map((cat, index) => ({ id: index, name: cat }));

  // Componente contador para ofertas con tiempo límite
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

  // Función para agregar un juego al carrito
  const handleAddToCart = (product) => {
    actions.addToCart(product, 1);
  };

  // Función toggle para la wishlist: si ya está agregado se elimina, de lo contrario se agrega.
  const toggleWishlist = async (product) => {
    if (wishlistMap[product.id]) {
      // El producto ya está en la wishlist, se elimina
      const wishlistItemId = wishlistMap[product.id];
      const result = await actions.removeFromWishlist(wishlistItemId);
      if (result) {
        const newMap = { ...wishlistMap };
        delete newMap[product.id];
        setWishlistMap(newMap);
      }
    } else {
      // El producto no está en la wishlist, se agrega
      const result = await actions.addToWishlist(product.id);
      if (result && result.id) {
        setWishlistMap({ ...wishlistMap, [product.id]: result.id });
      }
    }
  };

  return (
    <div className="home">
      {/* Sección Banner / Hero con promociones dinámicas */}
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
            <p>Discover your next adventure among our latest game releases.</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </section>
      )}

      {/* Sección de Juegos Recomendados (solo 3 productos) */}
      <section id="games" className="featured-games">
        <div className="container">
          <h2>Juegos Recomendados</h2>
          <div className="game-grid">
            {recommendedGamesToShow.length > 0 ? (
              recommendedGamesToShow.map((product) => (
                <div key={product.id} className="game-card">
                  <img
                    src={product.image_url || "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="game-image"
                  />
                  <div className="game-details">
                    <h3>{product.title}</h3>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <div className="actions">
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
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
              <p>No hay juegos disponibles.</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección de Categorías Populares */}
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

      {/* Sección de Ofertas con Descuento */}
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

      {/* Sección de Testimonios */}
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
