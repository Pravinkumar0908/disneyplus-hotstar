import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import auth from your firebase.js file
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Home from './components/Home';
import Banner from './components/Banner';
import Features from './components/Features';
import Popular from './components/Popular';
import DailyBest from './components/DailyBest';
import CategorySlider from './components/CategorySlider';
import ProductList from './components/ProductList';
import ProductPreview from './components/ProductPreview';
import Cart from './components/Cart';
import About from './components/About';
import PaymentGateway from './components/PaymentGateway';
import MyAccount from './components/MyAccount';
import LoginSignup from './components/Login'; // Import the LoginSignup component
import './Style/PaymentGateway.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppContent 
        cart={cart} 
        setCart={setCart} 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen}
        user={user}
      />
    </Router>
  );
}

function AppContent({ cart, setCart, isCartOpen, setIsCartOpen, user }) {
  const location = useLocation();
  const isAccountPage = location.pathname === '/myaccount';
  const showCommonComponents = !['/about', '/payment', '/cart', '/login', '/signup'].includes(location.pathname) &&
    !location.pathname.startsWith('/products/') &&
    !location.pathname.startsWith('/product/');

  return (
    <>
      {!isAccountPage && <Navbar cartItemCount={cart.length} setIsCartOpen={setIsCartOpen} user={user} />}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPreview cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={user ? <PaymentGateway /> : <Navigate to="/login" />} />
        <Route path="/myaccount" element={user ? <MyAccount /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup isSignup={true} />} />
      </Routes>
      {showCommonComponents && (
        <>
          <Banner />
          <CategorySlider />
          <Features />
          <Popular />
          <DailyBest />
        </>
      )}
      {!isAccountPage && <Footer />}
    </>
  );
}

export default App;