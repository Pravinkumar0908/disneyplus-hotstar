















import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TbCategory2 } from 'react-icons/tb';
import { FaUser, FaTicketAlt, FaHeart, FaCog, FaBell, FaSignOutAlt, FaSearch, FaShoppingCart, FaBars, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';


const NavbarWrapper = styled.nav`
  font-family: 'Quicksand', sans-serif;
  border-bottom: 1px solid #ddd;
`;

const TopBar = styled.div`
  background-color: #f7f8fd;
  padding: 5px 0;
  font-size: 13px;
  border-bottom: 1px solid #ddd;
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TopBarLeft = styled.div`
  display: flex;
  gap: 15px;
`;

const Satisfyspan = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Linkspan = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProIconLink = styled.div`
  cursor: pointer;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-right: 30px;
    margin-top: 10px;
  }
`;

const TopBarRight = styled.div`
  display: flex;
  gap: 15px;
`;

const TopBarLink = styled.a`
  color: #7e7e7e;
  text-decoration: none;
  &:hover {
    color: #3bb77e;
  }
`;

const MainNavbar = styled.div`
  background-color: #fff;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Logo = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #3bb77e;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 35%;
  margin: 0 40px;
  border: 2px solid #3bb77e;
  border-radius: 4px;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #3bb77e;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  list-style: none;
  animation: ${dropdownAnimation} 0.3s ease forwards;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  flex-grow: 1;
  font-size: 14px;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: black;
  font-size: 18px;
  border: none;
  cursor: pointer;
  outline: 2px solid #3bb77e;
  border-radius: 4px;
`;

const NavIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 20px;
  position: relative;
`;


const IconLink = styled(Link)`
  color: #7e7e7e;
  text-decoration: none;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;

  &:hover {
    color: #3bb77e;
  }
  
  svg {
    font-size: 15px;
    border-radius: 50%;
    padding: 8px;
  }
`;

const NotificationBadge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -10px;
  left: 10px;
`;

const LocationButton = styled.button`
  color: white;
  background-color: #3bb77e;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  position: relative;
  
  svg {
    font-size: 20px;
  }
  
  &:hover {
    background-color: #2a9d8f;
  }
`;

const BottomNav = styled.div`
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
`;

const BottomNavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const BrowseCategories = styled.div`
  background-color: #3bb77e;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #253d4e;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;

  &:hover {
    color: #3bb77e;
  }
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3bb77e;
  font-weight: 600;
  font-size: 18px;
`;

const HamburgerIcon = styled.div`
  display: none;
  color: #253d4e;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1000;
  padding: 20px;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const CloseIcon = styled.div`
  color: #253d4e;
  font-size: 24px;
  text-align: right;
  cursor: pointer;
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const MobileNavLink = styled(Link)`
  color: #253d4e;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid #e8e8e8;
`;

const ProfileDropdownWrapper = styled(DropdownWrapper)`
  display: inline-block;
  position: relative;
`;

const ProfileDropdownList = styled(DropdownList)`
  min-width: 200px;
  right: 0;
  left: auto;
  padding: 10px 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  padding: 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const Navbar = () => {
  const auth = getAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Your Location');
  const [cartItemCount, setCartItemCount] = useState(3); // Initial cart item count
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(prevState => !prevState);
  };

  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(prevState => !prevState);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(prevState => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prevState => !prevState);
  };

  const handleCategorySelect = (category) => {
    setSearchInput(category);
    setIsDropdownOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyDropdownOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'animated-popup'
      },
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            navigate('/');
            Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
          })
          .catch((error) => {
            console.error('Error logging out:', error);
          });
      }
    });
  };

  const categories = [
    'Electronics', 
    'Fashion', 
    'Home & Garden', 
    'Books', 
    'Toys', 
    'Sports', 
    'Beauty', 
    'Health', 
    'Automotive', 
    'Groceries'
  ];

  const languages = ['English', 'Spanish', 'French', 'German'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  const countries = ['India', 'United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Australia'];

  return (
    <NavbarWrapper>
      <TopBar>
        <TopBarContent>
          <TopBarLeft>
            <TopBarLink href="#">About Us</TopBarLink>
            <TopBarLink href="#">My Account</TopBarLink>
            <TopBarLink href="#">Wishlist</TopBarLink>
            <TopBarLink href="#">Order Tracking</TopBarLink>
            <Satisfyspan>100% Secure delivery without contacting the courier</Satisfyspan>
            <Linkspan>Need help? Call Us: <TopBarLink href="tel:1800900">1800 900</TopBarLink></Linkspan>
          </TopBarLeft>
          <TopBarRight>
            <DropdownWrapper>
              <TopBarLink href="#" onClick={toggleLanguageDropdown}>{selectedLanguage} <FaChevronDown /></TopBarLink>
              <DropdownList isOpen={isLanguageDropdownOpen}>
                {languages.map(lang => (
                  <DropdownListItem key={lang} onClick={() => handleLanguageSelect(lang)}>{lang}</DropdownListItem>
                ))}
              </DropdownList>
            </DropdownWrapper>
            <DropdownWrapper>
              <TopBarLink href="#" onClick={toggleCurrencyDropdown}>{selectedCurrency} <FaChevronDown /></TopBarLink>
              <DropdownList isOpen={isCurrencyDropdownOpen}>
                {currencies.map(curr => (
                  <DropdownListItem key={curr} onClick={() => handleCurrencySelect(curr)}>{curr}</DropdownListItem>
                ))}
              </DropdownList>
            </DropdownWrapper>
          </TopBarRight>
        </TopBarContent>
      </TopBar>
      <MainNavbar>
        <NavbarContent>
          <Logo>Nest</Logo>
          <SearchBar>
            <DropdownWrapper>
              <DropdownHeader onClick={toggleDropdown}>
                {searchInput || 'All Categories'} <FaChevronDown />
              </DropdownHeader>
              <DropdownList isOpen={isDropdownOpen}>
                {categories.map(category => (
                  <DropdownListItem 
                    key={category} 
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </DropdownListItem>
                ))}
              </DropdownList>
            </DropdownWrapper>
            <SearchInput
              type="text"
              placeholder="Search for items..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchButton><FaSearch /></SearchButton>
          </SearchBar>
          <NavIcons>
            <DropdownWrapper>
              <LocationButton onClick={toggleLocationDropdown}>
                <FaMapMarkerAlt />
                <span>{selectedLocation}</span>
                <FaChevronDown />
              </LocationButton>
              <DropdownList isOpen={isLocationDropdownOpen}>
                {countries.map(country => (
                  <DropdownListItem 
                    key={country} 
                    onClick={() => handleLocationSelect(country)}
                  >
                    {country}
                  </DropdownListItem>
                ))}
              </DropdownList>
            </DropdownWrapper>
            <IconLink to="/wishlist">
              <FaHeart />
              <NotificationBadge>5</NotificationBadge>
            </IconLink>
            <IconLink as="button" onClick={() => navigate('/cart')}>
              <FaShoppingCart />
              {cartItemCount > 0 && <NotificationBadge>{cartItemCount}</NotificationBadge>}
            </IconLink>
            {user && (
              <ProfileDropdownWrapper>
                <ProIconLink as="div" onClick={toggleProfileDropdown}>
                  <FaUser />
                </ProIconLink>
                <ProfileDropdownList isOpen={isProfileDropdownOpen}>
                  <DropdownListItem>
                    <Link to="/myaccount">
                      <FaUser /> My Account
                    </Link>
                  </DropdownListItem>
                  <DropdownListItem onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </DropdownListItem>
                </ProfileDropdownList>
              </ProfileDropdownWrapper>
            )}
          </NavIcons>
        </NavbarContent>
      </MainNavbar>
      <BottomNav>
        <BottomNavContent>
          <BrowseCategories>
            <TbCategory2 /> Browse All Categories
          </BrowseCategories>
          <NavLinks>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/vendors">Vendors</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </NavLinks>
          <PhoneNumber>
            <FaPhoneAlt /> <span>1800 900</span>
          </PhoneNumber>
          <HamburgerIcon onClick={() => setIsMobileMenuOpen(true)}><FaBars /></HamburgerIcon>
        </BottomNavContent>
        <MobileMenu isOpen={isMobileMenuOpen}>
          <CloseIcon onClick={() => setIsMobileMenuOpen(false)}><FaTimes /></CloseIcon>
          <MobileNavLinks>
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/shop">Shop</MobileNavLink>
            <MobileNavLink to="/products">Products</MobileNavLink>
            <MobileNavLink to="/blog">Blog</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
          </MobileNavLinks>
        </MobileMenu>
        </BottomNav>
    </NavbarWrapper>
  );
};

export default Navbar;