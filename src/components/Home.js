import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Keyframes for popup animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled components for the search box
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem auto;
  width: 80%;
  max-width: 500px;

  input {
    border: none;
    padding: 0.5rem;
    font-size: 0.9rem;
    width: 100%;
  }

  button {
    background-color: #febd69;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f3a847;
    }
  }
`;

// Styled components for the login popup
const LoginPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;


  .popup-content {
    background-color: #fffbf2;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 0.5s ease-out;

    h2 {
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.5rem;
    }

    button {
      background-color: #febd69;
      border: none;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      border-radius: 8px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f3a847;
      }
    }
  }
`;

const Home = ({ onSearchClick }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setShowLoginPopup(false);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    let interval;
    if (!isLoggedIn) {
      interval = setInterval(() => {
        setShowLoginPopup(true);
      }, 20000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoggedIn]);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      {isSearchVisible && (
        <SearchBox>
          <input type="text" placeholder="Search products..." />
          <button onClick={onSearchClick}>Search</button>
        </SearchBox>
      )}
      <div>
        {/* Your other home page content */}
        {!isLoggedIn && <button onClick={() => setShowLoginPopup(true)}>Login</button>}
      </div>
      {showLoginPopup && !isLoggedIn && (
        <LoginPopup>
          <div className="popup-content">
            <h2>Please log in to continue</h2>
            <button onClick={handleLogin}>Login</button>
          </div>
        </LoginPopup>
      )}
    </div>
  );
};

export default Home;
