import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturesContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const CategoryItem = styled.div`
  flex: 0 0 300px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid green;
  border-radius: 7px;
  max-width: 300px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  img {
  max-width: 270px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  max-width: 270px;

  }
  p {
    font-size: 12px;
    color: #666;
    margin: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    flex: 0 0 250px;
    img {
      width: 250px;
      height: 120px;
    }
    h3 {
      font-size: 12px;
    }
    p {
      font-size: 10px;
    }
  }
  @media (max-width: 480px) {
    flex: 0 0 200px;
    img {
      width: 200px;
      height: 100px;
    }
    h3 {
      font-size: 10px;
    }
    p {
      font-size: 8px;
    }
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background: #f0f0f0;
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

const Features = () => {
  const [categories, setCategories] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const itemsPerSlide = Math.floor(window.innerWidth / 320); // Adjust based on screen width
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const transformedCategories = data.map(product => ({
          name: product.title,
          items: Math.floor(Math.random() * 100),
          image: product.image
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
    AOS.init({ duration: 1000 });
  }, []);

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(categories.length / itemsPerSlide) - 1)
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${encodeURIComponent(categoryName)}`);
  };

  return (
    <FeaturesContainer>
      <Title data-aos="fade-down">Featured Categories</Title>
      <SliderContainer>
        <SliderWrapper style={{ transform: `translateX(-${slideIndex * (320 * itemsPerSlide)}px)` }}>
          {categories.map((category, index) => (
            <CategoryItem
              key={category.name}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <p>{category.items} items</p>
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
    </FeaturesContainer>
  );
};

export default Features;
