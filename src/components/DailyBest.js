import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const DailyBestContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const CategoryNav = styled.div`
  display: flex;
  gap: 15px;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.active ? '#4CAF50' : '#666'};
  &:hover { color: #4CAF50; }
`;

const ProductGrid = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturedCard = styled.div`
  flex: 0 0 400px;
  background: #e8f5e9;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
  height: 360px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FeaturedTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 20px;
`;

const ShopNowButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover { background-color: #45a049; }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
`;

const ProductsWrapper = styled(motion.div)`
  display: flex;
  max-width: 1200px;
  gap: 5px; // 5px gap between images
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  width: 330px;
  height: 400px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 330px;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${props => {
    switch(props.type) {
      case 'sale': return '#54a0ff';
      case 'best': return '#ff9ff3';
      case 'save': return '#ff4757';
      default: return '#5f27cd';
    }
  }};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  padding: 15px;
  flex-grow: 1;
  display: flex;
  color: #ffffff;
`;

const ProductCategory = styled.p`
  font-size: 12px;
  color: #ffffff;
  margin: 0 0 5px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin: 0 0 10px;
  color: #ffffff;
`;

const ProductRating = styled.div`
  color: #ffffff;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const OldPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
`;

const SoldInfo = styled.div`
  color: #ffffff;
  border-radius: 10px;
  height: 5px;
  margin-bottom: 10px;
`;

const SoldProgress = styled.div`
  background: #4CAF50;
  width: ${props => props.progress}%;
  height: 100%;
  border-radius: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  &:hover { background-color: #45a049; }
`;

const NavButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover { background-color: #45a049; }
  margin: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 5px;
  }
`;

const PrevButton = styled(NavButton)`
  left: 0;
  display: ${props => props.hidden ? 'none' : 'block'};
`;

const NextButton = styled(NavButton)`
  right: 0;
  display: ${props => props.hidden ? 'none' : 'block'};
`;

const DailyBest = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=10');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const productsPerPage = 1;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <DailyBestContainer>
      <Header>
        <Title>Daily Best Sells</Title>
        <CategoryNav>
          {['Featured', 'Popular', 'New added'].map(category => (
            <CategoryButton 
              key={category} 
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryNav>
      </Header>
      <ProductGrid>
        <FeaturedCard>
          <FeaturedImage src="https://source.unsplash.com/random/400x300/?nature" alt="Nature" />
          <FeaturedTitle>Bring nature into your home</FeaturedTitle>
          <ShopNowButton>Shop Now →</ShopNowButton>
        </FeaturedCard>
        <SliderContainer>
          <PrevButton onClick={prevSlide} hidden={currentIndex === 0}>←</PrevButton>
          <ProductsWrapper
            initial={{ x: 0 }}
            animate={{ x: -currentIndex * (250 + 5) * productsPerPage }} // width of each card + gap
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge type={product.id % 1 === 0 ? 'sale' : product.id % 1 === 1 ? 'best' : 'save'}>
                  {product.id % 1 === 0 ? 'Sale' : product.id % 1 === 1 ? 'Best sale' : `Save ${((product.id + 1) * 2)}%`}
                </Badge>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductName>{product.title}</ProductName>
                  <ProductRating>{'★'.repeat(Math.round(product.rating.rate))}</ProductRating>
                  <ProductPrice>
                    <Price>${(product.price * 0.9).toFixed(2)}</Price>
                    <OldPrice>${product.price.toFixed(2)}</OldPrice>
                  </ProductPrice>
                  <SoldInfo>
                    <SoldProgress progress={75} />
                  </SoldInfo>
                  {/* <AddToCartButton>Add To Cart</AddToCartButton> */}
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsWrapper>
          <NextButton onClick={nextSlide} hidden={currentIndex === totalPages - 1}>→</NextButton>
        </SliderContainer>
      </ProductGrid>
    </DailyBestContainer>
  );
};

export default DailyBest;
