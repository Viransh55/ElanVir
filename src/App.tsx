import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StyleQuiz from './pages/StyleQuiz';
import OutfitBuilder from './pages/OutfitBuilder';
import ShopTheLook from './pages/ShopTheLook';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/style-quiz" element={<StyleQuiz />} />
              <Route path="/outfit-builder" element={<OutfitBuilder />} />
              <Route path="/shop-the-look" element={<ShopTheLook />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;