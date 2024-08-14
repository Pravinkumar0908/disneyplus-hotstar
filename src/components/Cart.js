import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import animationData from '../animations/Animation1723019811149.json';



const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const CartItems = styled.div``;

const PriceDetails = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
`;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 10px 0;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #000;
`;

const ItemDiscount = styled.span`
  color: #388e3c;
  margin-left: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background-color: #fff;
  border: 1px solid #c2c2c2;
  padding: 5px 10px;
  cursor: pointer;
`;

const QuantityDisplay = styled.span`
  padding: 0 10px;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #2874f0;
  cursor: pointer;
  margin-right: 15px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const PlaceOrderButton = styled.button`
  background-color: #fb641b;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
`;

const DeliveryInfo = styled.div`
  margin-top: 10px;
  color: #388e3c;
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  color: #888;
  text-align: center;
  padding: 40px;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch cart items only if user is logged in
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
      } else {
        setUser(null);
        // Redirect to login page if user is not logged in
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  const updateQuantity = (id, color, size, change) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const updatedItems = cartItems.map(item =>
      item.id === id && item.color === color && item.size === size
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id, color, size) => {
    if (!user) {
      navigate('/login');
      return;
    }
    toast.success('Item removed from cart!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      style: { backgroundColor: '#f44d4d', color: '#fff', borderRadius: '5px' },
    });

    const updatedItems = cartItems.filter(item => 
      !(item.id === id && item.color === color && item.size === size)
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const orderData = {
      items: cartItems,
      totalAmount: calculateTotal()
    };

    // Redirect to payment gateway with order data
    navigate('/payment', { state: { orderData } });
  };

  if (!user) {
    return null; // Don't render anything while checking authentication
  }

  if (cartItems.length === 0) {
    return (
      <EmptyCartMessage>
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: 250, height: 250 }}
        />
        Your cart is empty. Start shopping to add items to your cart!
      </EmptyCartMessage>
    );
  }

  return (
    <>
      <CartContainer>
        <CartItems>
          {cartItems.map(item => (
            <CartItem key={`${item.id}-${item.color}-${item.size}`}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <p>{item.color}, {item.size}</p>
                <p>Seller: {item.seller}</p>
                <ItemPrice>
                  ₹{item.price.toLocaleString()}
                  <ItemDiscount>
                    {Math.round((1 - item.price / item.originalPrice) * 100)}% Off
                  </ItemDiscount>
                </ItemPrice>
                <QuantityControl>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.color, item.size, -1)}>-</QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.color, item.size, 1)}>+</QuantityButton>
                </QuantityControl>
                <ActionButton>SAVE FOR LATER</ActionButton>
                <ActionButton onClick={() => removeItem(item.id, item.color, item.size)}>REMOVE</ActionButton>
                <DeliveryInfo>{item.delivery}</DeliveryInfo>
              </ItemDetails>
            </CartItem>
          ))}
        </CartItems>
        <PriceDetails>
          <h2>PRICE DETAILS</h2>
          <PriceRow>
            <span>Price ({cartItems.length} items)</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </PriceRow>
          <PriceRow>
            <span>Delivery Charges</span>
            <span style={{ color: '#388e3c' }}>₹80 Free</span>
          </PriceRow>
          <TotalAmount>
            <PriceRow>
              <span>Total Amount</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </PriceRow>
          </TotalAmount>
          <PlaceOrderButton onClick={handlePlaceOrder}>PLACE ORDER</PlaceOrderButton>
        </PriceDetails>
      </CartContainer>
      <ToastContainer />
    </>
  );
};

export default Cart;
