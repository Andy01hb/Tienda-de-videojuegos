import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	// Dummy data for featured games
const games = [
	{
	  id: 1,
	  title: 'The Legend of React',
	  imageUrl: 'https://wpassets.halowaypoint.com/wp-content/2022/02/Halo-Infinite-Chief-Weapon-scaled.jpg',
	  price: '$59.99',
	},
	{
	  id: 2,
	  title: 'React Racing',
	  imageUrl: 'https://i.blogs.es/9ff3b1/assassin-s-saga/500_333.jpeg',
	  price: '$49.99',
	},
	{
	  id: 3,
	  title: 'Redux Rampage',
	  imageUrl: 'https://play-lh.googleusercontent.com/HXoSbz87wD8eUFnDkBKoQfe5oeo8HZXEsnQfYCNREy_tsqHheVcT6dKcUaXpSE2r6Q=w526-h296-rw',
	  price: '$39.99',
	},
	// Add more games as needed
  ];

	return (
		<div className="home">
		{/* Header / Navigation */}
		<header className="header">
		  <div className="container header-container">
			<h1 className="logo">Video Game Store</h1>
			<nav className="nav">
			  <ul>
				<li>
				  <a href="#home">Home</a>
				</li>
				<li>
				  <a href="#games">Games</a>
				</li>
				<li>
				  <a href="#about">About</a>
				</li>
				<li>
				  <a href="#contact">Contact</a>
				</li>
			  </ul>
			</nav>
		  </div>
		</header>
  
		{/* Hero Section */}
		<section className="hero">
		  <div className="container hero-container">
			<h2>Welcome to the Ultimate Video Game Store!</h2>
			<p>Discover your next adventure among our latest game releases.</p>
			<button className="shop-btn">Shop Now</button>
		  </div>
		</section>
  
		{/* Featured Games Section */}
		<section id="games" className="featured-games">
		  <div className="container">
			<h2>Featured Games</h2>
			<div className="game-grid">
			  {games.map((game) => (
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
  
		{/* Footer */}
		<footer className="footer">
		  <div className="container">
			<p>&copy; {new Date().getFullYear()} Video Game Store. All rights reserved.</p>
		  </div>
		</footer>
	  </div>
	);
};
