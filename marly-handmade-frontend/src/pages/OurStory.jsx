import React from "react";
import "../styles/OurStory.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import workshopImg from "../assets/ourstory1.jpg";
import makerImg from "../assets/ourstory2.jpg";
import product1 from "../assets/ourstory3.jpg";
import product2 from "../assets/ourstory4.jpg";
import product3 from "../assets/ourstory5.jpg";
import product4 from "../assets/ourstory6.jpg";

const OurStory = () => {
  const favorites = [
    { img: product1, name: "Terracotta Earrings", price: "$24" },
    { img: product2, name: "Aqua Kintsugi", price: "$36" },
    { img: product3, name: "Sahara Treasure", price: "$42" },
    { img: product4, name: "Caimito Bracelet", price: "$28" },
  ];

  return (
    <div className="ourstory">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-image-container">
            <img
              src={workshopImg}
              alt="Marly's Workshop"
              className="hero-image"
            />
            <button className="meet-marly-btn">MEET MARLY</button>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-title-wrapper">
            <h1 className="about-title">About MARLY’s World</h1>
          </div>
          <div className="about-content">
            <p className="about-text italic">
              At Marly Handmade, we believe in slow creation — in objects made
              with care and intention. What started as a small creative spark
              has grown into a home for craftsmanship, curiosity, and soulful
              beauty.
            </p>
            <p className="about-text italic">
              Each piece tells a story, from one to many but with just one soul.
              It’s by touching the soul, not just the surface, where your unique
              spirit can reflect soul with soul.
            </p>
          </div>
        </section>

        {/* Maker Section */}
        <section className="maker-section">
          <div className="maker-container">
            <div className="maker-image-wrapper">
              <img
                src={makerImg}
                alt="Meet the Maker"
                className="maker-image"
              />
            </div>
            <div className="maker-content">
              <h2 className="maker-title">Meet the Maker</h2>
              <p className="maker-text">
                Hi, I’m Marly — the hands and heart behind Marly Handmade. My
                creative process comes from a place of intuition, intention, and
                care.
              </p>
              <p className="maker-text">
                I started Marly Handmade as a way to connect with others through
                the power of touch, craftsmanship, and wonder — it’s a way of
                making that is meaningful and beautiful.
              </p>
              <p className="maker-text">
                I’m so grateful you’re here. I hope you’ll find joy in owning
                something that was made with thought and love.
              </p>
            </div>
          </div>
        </section>

        {/* Thank You Message */}
        <div className="thank-you-message">
          Thank you for being part of Marly Handmade.
        </div>

        {/* Favorites Section */}
        <section className="favorites-section">
          <div className="favorites-header">
            <h2 className="favorites-title">Marly’s favorites</h2>
            <button className="view-all-btn">View all</button>
          </div>
          <div className="favorites-grid">
            {favorites.map((item, index) => (
              <div className="favorite-item" key={index}>
                <div className="favorite-image">
                  <img src={item.img} alt={item.name} />
                </div>
                <h3 className="favorite-name">{item.name}</h3>
                <p className="favorite-price">{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurStory;
