import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PopularContainer = styled.div`
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
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const CategoryNav = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.active ? '#4CAF50' : '#666'};
  white-space: nowrap;

  &:hover {
    color: #4CAF50;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 20px;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductCategory = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 0 5px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin: 0 0 10px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StarRating = styled.div`
  color: #ffc107;
  margin-right: 5px;
`;

const RatingCount = styled.span`
  font-size: 12px;
  color: #666;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
`;

const AddButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
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
      case 'hot': return '#ff4757';
      case 'sale': return '#54a0ff';
      case 'new': return '#5f27cd';
      default: return '#ff9ff3';
    }
  }};
`;

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // Log the fetched data to the console
        console.log(data);

        // Extract unique categories from the products
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(['All', ...uniqueCategories]); // Include 'All' option

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    AOS.init({ duration: 1000 });
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <PopularContainer>
      <Header>
        <Title data-aos="fade-up">Popular Products</Title>
        <CategoryNav data-aos="fade-left">
          {categories.map(category => (
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
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge type={Math.random() > 0.5 ? 'hot' : 'sale'}>
              {Math.random() > 0.5 ? 'Hot' : 'Sale'}
            </Badge>
            <ProductImage src={product.image} alt={product.title} />
            <ProductInfo>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.title}</ProductName>
              <ProductRating>
                <StarRating>{'★'.repeat(Math.round(product.rating.rate))}</StarRating>
                <RatingCount>({product.rating.count})</RatingCount>
              </ProductRating>
              <ProductPrice>
                <Price>${product.price.toFixed(2)}</Price>
                <AddButton>Add</AddButton>
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </PopularContainer>
  );
};

export default Popular;
