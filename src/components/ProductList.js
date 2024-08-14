import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const ProductListContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  gap: 30px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #444;
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    margin: 0 0 10px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #4CAF50;
    font-weight: bold;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.active ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e0e0e0'};
  }
`;

const ProductList = () => {
  const { categoryName = 'All' } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    // Simulating API call with more detailed dummy data
    const dummyProducts = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      originalPrice: Math.floor(Math.random() * 100) + 50,
      image: `https://picsum.photos/400/600?random=${i + 1}`,
      description: `This is a detailed description for Product ${i + 1}. It provides information about the product's features and benefits.`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      colors: ['Red', 'Blue', 'Green', 'Yellow'],
      sizes: ['S', 'M', 'L', 'XL'],
      color: ['Red', 'Blue', 'Green', 'Yellow'][Math.floor(Math.random() * 4)],
      type: ['Type A', 'Type B', 'Type C'][Math.floor(Math.random() * 3)],
      sku: `SKU-${i + 1}`,
      dimensions: { 
        width: Math.floor(Math.random() * 10) + 5,
        height: Math.floor(Math.random() * 20) + 10,
        depth: Math.floor(Math.random() * 5) + 2
      },
    }));

    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
    setIsLoading(false);
  }, [categoryName]);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(product.type))
    );

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [searchTerm, priceRange, sortBy, selectedColors, selectedTypes, products]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <ProductListContainer>
      <Sidebar>
        <Title>Filters</Title>
        <FilterSection>
          <FilterTitle>Search</FilterTitle>
          <SearchInput 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search products..." 
          />
        </FilterSection>
        <FilterSection>
          <FilterTitle>Price Range</FilterTitle>
          <PriceRange>
            <RangeInput 
              type="range" 
              min="0" 
              max="100" 
              value={priceRange.min} 
              onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))} 
            />
            <RangeInput 
              type="range" 
              min="0" 
              max="100" 
              value={priceRange.max} 
              onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))} 
            />
            <div>{`$${priceRange.min} - $${priceRange.max}`}</div>
          </PriceRange>
        </FilterSection>
        <FilterSection>
          <FilterTitle>Colors</FilterTitle>
          {['Red', 'Blue', 'Green', 'Yellow'].map(color => (
            <CheckboxLabel key={color}>
              <input 
                type="checkbox" 
                checked={selectedColors.includes(color)} 
                onChange={() => handleColorChange(color)} 
              />
              {color}
            </CheckboxLabel>
          ))}
        </FilterSection>
        <FilterSection>
          <FilterTitle>Types</FilterTitle>
          {['Type A', 'Type B', 'Type C'].map(type => (
            <CheckboxLabel key={type}>
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)} 
                onChange={() => handleTypeChange(type)} 
              />
              {type}
            </CheckboxLabel>
          ))}
        </FilterSection>
        <FilterSection>
          <FilterTitle>Sort By</FilterTitle>
          <FilterSelect 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </FilterSelect>
        </FilterSection>
      </Sidebar>
      <MainContent>
        <AnimatePresence>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ProductGrid>
                {currentProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                  </ProductCard>
                ))}
              </ProductGrid>
              <Pagination>
                {[...Array(pageCount)].map((_, i) => (
                  <PageButton 
                    key={i} 
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
              </Pagination>
            </>
          )}
        </AnimatePresence>
      </MainContent>
    </ProductListContainer>
  );
};

export default ProductList;