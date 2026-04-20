import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ShopPage from './pages/ShopPage';
import GiftCardPage from './pages/GiftCardPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import AdminDashboard from './pages/AdminDashboard';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/giftcards" element={<GiftCardPage />} />
          </Routes>
        </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;