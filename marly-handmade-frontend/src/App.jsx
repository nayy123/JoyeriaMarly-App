
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintsBook from "./pages/ComplaintsBook";
import TermsConditions from "./pages/TermsConditions";
import CollectionDetail from "./pages/ColletionDetail";
import RecoverPassword from "./pages/RecoverPassword";
import Product from "./pages/Product";
import ConfirmNewPassword from "./pages/ConfirnNewPassword"
import DetalleProducto from './pages/DetalleProducto';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints-book" element={<ComplaintsBook />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/collection-detail" element={<CollectionDetail />} />
        <Route path="/recover-password" element={<RecoverPassword />} /> 
        <Route path="/product" element={<Product />} />
        <Route path="/confirm-new-password/:token" element={<ConfirmNewPassword />} />
        <Route path="/product/:collectionType/:productId" element={<DetalleProducto />} />
      </Routes>
    </>
  );
}

export default App;
