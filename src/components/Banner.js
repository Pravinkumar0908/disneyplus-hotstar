import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BannerContainer = styled.div`
  width: calc(100% - 30px); /* Full width minus 40px to account for 20px gap on each side */
  max-width: 1600px; /* Optional: limit the maximum width */
  height: 450px;
  margin: 0 auto; /* Center the container */
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
    border-radius: 12px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.active {
    opacity: 1;
    animation: ${fadeIn} 0.5s ease-in-out;
  }
`;

const BannerIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.active {
    background-color: white;
  }
`;

const bannerImages = [
  'https://picsum.photos/seed/banner1/1200/400',
  'https://picsum.photos/seed/banner2/1200/400',
  'https://picsum.photos/seed/banner3/1200/400',
  'https://picsum.photos/seed/banner4/1200/400',
  'https://picsum.photos/seed/banner5/1200/400',
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <BannerContainer>
      {bannerImages.map((image, index) => (
        <BannerImage
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={index === currentSlide ? 'active' : ''}
        />
      ))}
      <BannerIndicators>
        {bannerImages.map((_, index) => (
          <Indicator
            key={index}
            className={index === currentSlide ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </BannerIndicators>
    </BannerContainer>
  );
};

export default Banner;
