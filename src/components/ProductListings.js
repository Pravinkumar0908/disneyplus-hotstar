import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CategorySection = styled.div``;

const CategoryTitle = styled.h2`
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #eee;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #333;
`;

const Rating = styled.div`
  color: #ffc107;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-left: 5px;
`;

const MainTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Product = ({ name, rating, price, originalPrice, image }) => (
  <ProductCard data-aos="fade-up" data-aos-duration="1000">
    <ProductImage src={image} alt={name} />
    <ProductInfo>
      <ProductName>{name}</ProductName>
      <Rating>{'★'.repeat(Math.floor(rating))} ({rating})</Rating>
      <Price>
        ${price.toFixed(2)}
        <OriginalPrice>${originalPrice.toFixed(2)}</OriginalPrice>
      </Price>
    </ProductInfo>
  </ProductCard>
);

const ProductListings = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const categories = [
    {
      title: "Top Selling",
      products: [
        { name: "Nestle Original Coffee-Mate Coffee Creamer", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/coffee-creamer1.jpg" },
        { name: "Nestle Original Coffee-Mate Coffee Creamer", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/coffee-creamer2.jpg" },
        { name: "Nestle Original Coffee-Mate Coffee Creamer", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/coffee-creamer3.jpg" },
      ]
    },
    {
      title: "Trending Products",
      products: [
        { name: "Organic Cage-Free Grade A Large Brown Eggs", rating: 5.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/eggs.jpg" },
        { name: "Seeds of Change Organic Quinoa, Brown, & Red Rice", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/rice.jpg" },
        { name: "Naturally Flavored Cinnamon Vanilla Light Roast Coffee", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/coffee.jpg" },
      ]
    },
    {
      title: "Recently added",
      products: [
        { name: "Pepperidge Farm Farmhouse Hearty White Bread", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/bread.jpg" },
        { name: "Organic Frozen Triple Berry Blend", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/berries.jpg" },
        { name: "Oroweat Country Buttermilk Bread", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/buttermilk-bread.jpg" },
      ]
    },
    {
      title: "Top Rated",
      products: [
        { name: "Foster Farms Takeout Crispy Classic Buffalo Wings", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/wings.jpg" },
        { name: "Angie's Boomchickapop Sweet & Salty Kettle Corn", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/popcorn.jpg" },
        { name: "All Natural Italian-Style Chicken Meatballs", rating: 4.0, price: 32.85, originalPrice: 35.8, image: "https://example.com/meatballs.jpg" },
      ]
    }
  ];

  return (
    <Container>
      <MainTitle data-aos="fade-down">Top Selling Products</MainTitle>
      <CategoryGrid>
        {categories.map((category, index) => (
          <CategorySection key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <CategoryTitle>{category.title}</CategoryTitle>
            {category.products.map((product, prodIndex) => (
              <Product key={prodIndex} {...product} />
            ))}
          </CategorySection>
        ))}
      </CategoryGrid>
    </Container>
  );
};

export default ProductListings;