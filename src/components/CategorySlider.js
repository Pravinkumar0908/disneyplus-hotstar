import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
  padding-top: 30px;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const borderAnimation = keyframes`
  0% { border-color: #1a2a6c; }
  33% { border-color: #b21f1f; }
  66% { border-color: #fdbb2d; }
  100% { border-color: #1a2a6c; }
`;

const CategoryItem = styled.div`
  flex: 0 0 130px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid transparent;
    animation: ${borderAnimation} 2s linear infinite;
  }
  p {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex: 0 0 100px;
    img {
      width: 70px;
      height: 70px;
    }
    p {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    flex: 0 0 80px;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  background: linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d);
  transform: translateY(-50%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.prev {
    left: 10px;
  }
  &.next {
    right: 10px;
  }
`;

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  const updateItemsPerSlide = () => {
    if (window.innerWidth <= 480) {
      setItemsPerSlide(2);
    } else if (window.innerWidth <= 768) {
      setItemsPerSlide(3);
    } else {
      setItemsPerSlide(5);
    }
  };

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=42')
      .then(response => {
        const products = response.data;
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        const fetchedCategories = uniqueCategories.map((category, index) => ({
          id: index,
          name: category,
          image: products.find(product => product.category === category).image
        }));
        setCategories(fetchedCategories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(categories.length / itemsPerSlide) - 1)
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <SliderContainer>
      <SliderWrapper style={{ transform: `translateX(-${slideIndex * (100 / itemsPerSlide)}%)` }}>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </CategoryItem>
        ))}
      </SliderWrapper>
      <SliderButton className="prev" onClick={prevSlide} disabled={slideIndex === 0}>
        <FaChevronLeft />
      </SliderButton>
      <SliderButton
        className="next"
        onClick={nextSlide}
        disabled={slideIndex >= Math.ceil(categories.length / itemsPerSlide) - 1}
      >
        <FaChevronRight />
      </SliderButton>
    </SliderContainer>
  );
};

export default CategorySlider;
