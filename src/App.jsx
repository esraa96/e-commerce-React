import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ProductDetail from "./components/ProductDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CategoryPage from "./components/CategoryPage";
import Collections from "./components/Collections";
import CategoriesOverview from "./components/CategoriesOverview";
import SearchResults from "./components/SearchResults";
import Contact from "./components/Contact";
import Favorites from "./components/Favorites";
import { PrivateRoute } from "./components/PrivateRoute";
import { CartProvider } from "./hooks/useCart";
import Profile from "./components/Profile";
import Orders from "./components/Orders";

function App() {
  return (
    <CartProvider>
      <Nav />
      <main className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Collections />} />
          <Route path="/collections" element={<Home />} />
          <Route path="/categories" element={<CategoriesOverview />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/wishlist" element={<Cart />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CartProvider>
  );
}

export default App;