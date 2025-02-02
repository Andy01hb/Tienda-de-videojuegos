import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	// Even if you don't use store/actions in this example, we include them
	const { store, actions } = useContext(Context);

	// =====================================================
	// Dummy Data for the Different Sections of the Home Page
	// =====================================================

	// 1. Banner / Main Promotion (used as the hero if available)
	const featuredPromotions = [
		{
			id: 1,
			title: 'Lanzamiento Destacado: "Aventura Épica"',
			description:
				'Descubre el nuevo mundo de Aventura Épica con un 20% de descuento por tiempo limitado.',
			imageUrl:
				"https://forum.xboxera.com/uploads/default/original/2X/1/13f2199320bb47c3b0658cfe603057b2f0a2b41b.jpeg",
		},
	];

	// 2. Recommended Games
	const recommendedGames = [
		{
			id: 1,
			title: "The Legend of React",
			imageUrl:
				"https://wpassets.halowaypoint.com/wp-content/2022/02/Halo-Infinite-Chief-Weapon-scaled.jpg",
			price: "$59.99",
		},
		{
			id: 2,
			title: "React Racing",
			imageUrl:
				"https://store-images.s-microsoft.com/image/apps.58021.69011092827716296.e9190db7-6f4c-478c-8555-3edad4336a39.de8bb314-af23-4670-9343-fa78251591c8?q=90&w=480&h=270",
			price: "$49.99",
		},
		{
			id: 3,
			title: "Redux Rampage",
			imageUrl:
				"https://play-lh.googleusercontent.com/HXoSbz87wD8eUFnDkBKoQfe5oeo8HZXEsnQfYCNREy_tsqHheVcT6dKcUaXpSE2r6Q=w526-h296-rw",
			price: "$39.99",
		},
	];

	// 3. Popular Categories
	const popularCategories = [
		{ id: 1, name: "AAA" },
		{ id: 2, name: "Indie" },
		{ id: 3, name: "RPG" },
		{ id: 4, name: "Shooters" },
	];

	// 4. Discount Offers with a Countdown
	const discountOffers = [
		{
			id: 1,
			title: 'Oferta Flash: 50% en "Aventura Épica"',
			expiresAt: new Date(Date.now() + 3600 * 1000), // Expires in 1 hour
			imageUrl:
				"https://press-start.com.au/wp-content/uploads/2023/01/games-coming-in-february-770x433.jpg",
		},
	];

	// 5. Testimonials
	const testimonials = [
		{
			id: 1,
			user: "Juan Pérez",
			comment:
				"¡La mejor tienda de videojuegos en línea! Atención impecable y ofertas increíbles.",
			rating: 5,
		},
		{
			id: 2,
			user: "María Gómez",
			comment:
				"Encuentro siempre los juegos que busco. ¡Muy recomendable!",
			rating: 4,
		},
	];

	// =====================================================
	// LimitedOfferCounter Component for Countdown Timer
	// =====================================================
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

	// =====================================================
	// Render the Complete Home Page
	// =====================================================
	return (
		<div className="home">
			{/* Banner / Hero Section (using promotion if available) */}
			{featuredPromotions.length > 0 ? (
				<section className="banner">
					{featuredPromotions.map((promo) => (
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
							Discover your next adventure among our latest game
							releases.
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
						{recommendedGames.map((game) => (
							<div key={game.id} className="game-card">
								<img
									src={game.imageUrl}
									alt={game.title}
									className="game-image"
								/>
								<div className="game-details">
									<h3>{game.title}</h3>
									<p className="price">{game.price}</p>
									<button className="add-to-cart-btn">Add to Cart</button>
								</div>
							</div>
						))}
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
						{discountOffers.map((offer) => (
							<div key={offer.id} className="offer-card">
								<img src={offer.imageUrl} alt={offer.title} />
								<h3>{offer.title}</h3>
								<LimitedOfferCounter expiresAt={offer.expiresAt} />
								<button className="btn">Aprovechar Oferta</button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="testimonials">
				<div className="container">
					<h2>Testimonios</h2>
					<div className="testimonials-grid">
						{testimonials.map((testimonial) => (
							<div key={testimonial.id} className="testimonial-card">
								<p className="comment">"{testimonial.comment}"</p>
								<p className="user">- {testimonial.user}</p>
								<p className="rating">Rating: {testimonial.rating} / 5</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
