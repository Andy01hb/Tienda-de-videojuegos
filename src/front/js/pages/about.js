import React from "react";
import { Link } from "react-router-dom";
import "../../styles/about.css";

export const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <header className="about-header">
          <h1>Bienvenido a Video Game Store: Tu Portal de Videojuegos Digitales</h1>
        </header>

        <section className="about-history">
          <h2>Nuestra Historia</h2>
          <p>
            Desde nuestra fundación en 2020, hemos trabajado para ofrecer los mejores videojuegos digitales con una experiencia de compra segura y rápida.
          </p>
        </section>

        <section className="about-mission-vision">
          <div className="mission">
            <h2>Misión</h2>
            <p>
              Facilitar el acceso a videojuegos de manera rápida, confiable y al mejor precio.
            </p>
          </div>
          <div className="vision">
            <h2>Visión</h2>
            <p>
              Ser la tienda digital de referencia en videojuegos, ofreciendo promociones exclusivas y un excelente servicio al cliente.
            </p>
          </div>
        </section>

        <section className="about-unique">
          <h2>¿Qué nos hace únicos?</h2>
          <ul>
            <li>Entrega instantánea de códigos digitales.</li>
            <li>Ofertas exclusivas y descuentos.</li>
            <li>Atención al cliente 24/7.</li>
          </ul>
        </section>

        <section className="about-testimonials">
          <h2>Testimonios de Nuestros Clientes</h2>
          <div className="testimonials">
            <blockquote>
              "La mejor experiencia de compra, rápida y segura."
              <cite> - Juan Pérez</cite>
            </blockquote>
            <blockquote>
              "Me encanta la variedad y las ofertas, ¡recomendada!"
              <cite> - María Gómez</cite>
            </blockquote>
          </div>
        </section>

        <section className="about-media">
          <h2>Conoce nuestra tienda</h2>
          {/* Aquí puedes incluir un video o imágenes. Se incluye un video de ejemplo. */}
          <video controls className="about-video">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </section>

        <div className="cta">
          <Link to="/gamelist" className="cta-btn">
            Explora nuestros juegos ahora
          </Link>
        </div>
      </div>
    </div>
  );
};
