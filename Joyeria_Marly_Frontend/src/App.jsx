import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintsBook from "./pages/ComplaintsBook";
import TermsConditions from "./pages/TermsConditions";
import CollectionDetail from "./pages/CollectionDetail";
import RecoverPassword from "./pages/RecoverPassword";
import Product from "./pages/Product";
import ProductDetail from "./components/ProductDetail";
import ConfirmNewPassword from "./pages/ConfirnNewPassword";
import Profile from "./pages/Profile";
import MarlyCollections from './components/MarlyCollections';
import SeaCollection from './components/SeaCollection';
import MataritaCollection from './components/MataritaCollection';
import BestSellers from './components/BestSellers';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complaints-book" element={<ComplaintsBook />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/collection-detail" element={<CollectionDetail />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:collectionType/:productId" element={<ProductDetail />} />
        <Route
          path="/confirm-new-password/:token"
          element={<ConfirmNewPassword />}
        />
        
        {/* AGREGAR ESTAS RUTAS NUEVAS */}
        <Route path="/marly-collections" element={<MarlyCollections />} />
        <Route path="/product/sea-collection" element={<SeaCollection />} />
        <Route path="/product/matarita-collection" element={<MataritaCollection />} />
        <Route path="/product/best-sellers" element={<BestSellers />} />
      </Routes>
    </>
  );
}

export default App;