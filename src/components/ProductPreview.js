import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PreviewContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 30px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Star = styled.span`
  color: #FFD700;
  font-size: 24px;
`;

const ColorSelector = styled.div`
  margin-bottom: 20px;
`;

const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#333' : 'transparent'};
  background-color: ${props => props.color};
  margin-right: 10px;
  cursor: pointer;
`;

const SizeSelector = styled.div`
  margin-bottom: 20px;
`;

const SizeOption = styled.button`
  padding: 5px 10px;
  margin-right: 10px;
  border: 2px solid ${props => props.selected ? '#333' : '#ddd'};
  background-color: ${props => props.selected ? '#f0f0f0' : 'white'};
  cursor: pointer;
`;

const AddToCartButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const SuccessPopup = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
`;

const ProductPreview = () => {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    };
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...currentCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  };

  return (
    <PreviewContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ImageContainer>
        <img src={product.image} alt={product.name} />
      </ImageContainer>
      <InfoContainer>
        <Title>{product.name}</Title>
        <Description>{product.description}</Description>
        <Price>${product.price.toFixed(2)}</Price>
        <Rating>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index}>
              {index < Math.floor(product.rating) ? '★' : '☆'}
            </Star>
          ))}
          {product.rating}
        </Rating>
        <ColorSelector>
          <h3>Color:</h3>
          {product.colors.map(color => (
            <ColorOption
              key={color}
              color={color}
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </ColorSelector>
        <SizeSelector>
          <h3>Size:</h3>
          {product.sizes.map(size => (
            <SizeOption
              key={size}
              selected={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </SizeOption>
          ))}
        </SizeSelector>
        <p>SKU: {product.sku}</p>
        <p>Dimensions: {product.dimensions.width}" x {product.dimensions.height}" x {product.dimensions.depth}"</p>
        <AddToCartButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </AddToCartButton>
      </InfoContainer>
      <AnimatePresence>
        {showSuccessPopup && (
          <SuccessPopup
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            Product added to cart successfully!
          </SuccessPopup>
        )}
      </AnimatePresence>
    </PreviewContainer>
  );
};

export default ProductPreview;