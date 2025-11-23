import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Home from './pages/Home.jsx'
import Sports from './pages/Sports.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import Product from './pages/Product.jsx'
import Checkout from './pages/Checkout.jsx'
import Products from './pages/Products.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <div style={{minHeight:'100dvh', display:'flex', flexDirection:'column'}}>
      {/* Navbar will become a left sidebar on wider screens via CSS */}
      <Navbar />

      <main className="main-content" style={{flex:1}}>
        <div className="container">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports/:sport" element={<Sports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} HTKSA. All rights reserved.</span>
          <span>Built with React.</span>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
