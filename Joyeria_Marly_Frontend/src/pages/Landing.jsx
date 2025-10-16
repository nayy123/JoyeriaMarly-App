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

export default function CartPage() {
  return (
    <>
      <Header />

      <Hero imagen={heroImg} texto={true} />

      <ShortMarlyDescriptionLanding />

      <MostLoved />

      <MarlyCollections />

      <ShopByLook />

      <MeetTheMaker />

      <ShopInPerson />

      <Footer />
    </>
  );
}
