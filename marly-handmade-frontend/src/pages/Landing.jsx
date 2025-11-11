import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ShortMarlyDescriptionLanding from "../components/ShortMarlyDescriptionLanding";
import MostLoved from "../components/MostLoved";
import MarlyCollections from "../components/MarlyCollections";
import ShopByLook from "../components/ShopByLook";
import MeetTheMaker from "../components/MeetTheMaker";
import ShopInPerson from "../components/ShopInPerson";
import heroImg from "../assets/hero.png";

import { Link } from "react-router-dom";

export default function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // duración de la animación (en ms)
      once: true, // anima solo una vez
      easing: "ease-in-out", // suavidad del movimiento
      offset: 100, // distancia en px antes de que empiece la animación
    });
  }, []);

  return (
    <>
      <Header />

      <Hero texto={true} />

      <div data-aos="fade-up">
        <ShortMarlyDescriptionLanding />
      </div>

      <div data-aos="fade-left">
        <MostLoved />
      </div>

      <div data-aos="fade-right">
        <MarlyCollections />
      </div>

      <div data-aos="fade-left">
        <ShopByLook />
      </div>

      <div data-aos="fade-up">
        <MeetTheMaker />
      </div>

      <ShopInPerson />

      <Footer />
    </>
  );
}
