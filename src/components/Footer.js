import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';
import { IoIosArrowUp } from 'react-icons/io';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem 0;
  font-family: Arial, sans-serif;
  animation: ${fadeIn} 0.5s ease-in;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterTitle = styled.h3`
  color: #4CAF50;
  margin-bottom: 1rem;
  max-width: 350px;
`;

const FooterList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #4CAF50;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e0e0e0;
  margin-top: 2rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterText = styled.p`
  color: #000;
  margin: 0;
  margin-left: 20px;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 80px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const SocialIcon = styled.a`
  color: #666;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
`;

const AddressInfo = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  margin-left: -30px;
  align-items: center;
  max-width: 200px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Icon = styled.span`
  margin-right: 0.5rem;
  color: #4CAF50;
`;

const AppDownload = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

const AppButton = styled.img`
  height: 40px;
`;

const PaymentMethods = styled.div`
  margin-top: 1rem;
`;

const PaymentImage = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const ScrollToTop = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  &:hover {
    background-color: #45a049;
  }
`;

const Footer = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <FooterContainer data-aos="fade-up">
        <FooterContent>
          <FooterSection data-aos="fade-right">
            <Logo>
              <LogoText>Nest</LogoText>
            </Logo>
            <AddressInfo data-aos="fade-up">
              <Icon><MdLocationOn /></Icon>
              Address: 5171 W Campbell Ave undefined Kent, Utah 53127 United States
            </AddressInfo>
            <AddressInfo data-aos="fade-up">
              <Icon><MdPhone /></Icon>
              Call Us: (+91) - 540-025-124553
            </AddressInfo>
            <AddressInfo data-aos="fade-up">
              <Icon><MdEmail /></Icon>
              Email: sale@Nest.com
            </AddressInfo>
            <AddressInfo data-aos="fade-up">
              <Icon><MdAccessTime /></Icon>
              Hours: 10:00 - 18:00, Mon - Sat
            </AddressInfo>
          </FooterSection>
          <FooterSection data-aos="fade-left">
            <FooterTitle>Company</FooterTitle>
            <FooterList>
              <FooterListItem>About Us</FooterListItem>
              <FooterListItem>Delivery Information</FooterListItem>
              <FooterListItem>Privacy Policy</FooterListItem>
              <FooterListItem>Terms & Conditions</FooterListItem>
              <FooterListItem>Contact Us</FooterListItem>
              <FooterListItem>Support Center</FooterListItem>
              <FooterListItem>Careers</FooterListItem>
            </FooterList>
          </FooterSection>
          <FooterSection data-aos="fade-right">
            <FooterTitle>Account</FooterTitle>
            <FooterList>
              <FooterListItem>Sign In</FooterListItem>
              <FooterListItem>View Cart</FooterListItem>
              <FooterListItem>My Wishlist</FooterListItem>
              <FooterListItem>Track My Order</FooterListItem>
              <FooterListItem>Help Ticket</FooterListItem>
              <FooterListItem>Shipping Details</FooterListItem>
              <FooterListItem>Compare products</FooterListItem>
            </FooterList>
          </FooterSection>
          <FooterSection data-aos="fade-left">
            <FooterTitle>Corporate</FooterTitle>
            <FooterList>
              <FooterListItem>Become a Vendor</FooterListItem>
              <FooterListItem>Affiliate Program</FooterListItem>
              <FooterListItem>Farm Business</FooterListItem>
              <FooterListItem>Farm Careers</FooterListItem>
              <FooterListItem>Our Suppliers</FooterListItem>
              <FooterListItem>Accessibility</FooterListItem>
              <FooterListItem>Promotions</FooterListItem>
            </FooterList>
          </FooterSection>
          <FooterSection data-aos="fade-up">
            <FooterTitle>Popular</FooterTitle>
            <FooterList>
              <FooterListItem>Milk & Flavoured Milk</FooterListItem>
              <FooterListItem>Butter and Margarine</FooterListItem>
              <FooterListItem>Eggs Substitutes</FooterListItem>
              <FooterListItem>Marmalades</FooterListItem>
              <FooterListItem>Sour Cream and Dips</FooterListItem>
              <FooterListItem>Tea & Kombucha</FooterListItem>
              <FooterListItem>Cheese</FooterListItem>
            </FooterList>
          </FooterSection>
          <FooterSection data-aos="fade-up">
            <FooterTitle>Install App</FooterTitle>
            <FooterText>From App Store or Google Play</FooterText>
            <AppDownload>
              <AppButton src="/path-to-app-store-button.png" alt="Download on App Store" />
              <AppButton src="/path-to-google-play-button.png" alt="Get it on Google Play" />
            </AppDownload>
            <FooterText>Secured Payment Gateways</FooterText>
            <PaymentMethods>
              <PaymentImage src="/path-to-visa-logo.png" alt="Visa" />
              <PaymentImage src="/path-to-mastercard-logo.png" alt="Mastercard" />
              <PaymentImage src="/path-to-maestro-logo.png" alt="Maestro" />
              <PaymentImage src="/path-to-amex-logo.png" alt="American Express" />
            </PaymentMethods>
          </FooterSection>
        </FooterContent>
        <FooterBottom data-aos="fade-up">
          <FooterText>© 2024 Nest -Ecommerce Shop India .<br /> All rights reserved</FooterText>
          <SocialIcons>
            <span>Follow Us</span>
            <SocialIcon href="#"><FaFacebookF /></SocialIcon>
            <SocialIcon href="#"><FaTwitter /></SocialIcon>
            <SocialIcon href="#"><FaInstagram /></SocialIcon>
            <SocialIcon href="#"><FaPinterestP /></SocialIcon>
            <SocialIcon href="#"><FaYoutube /></SocialIcon>
          </SocialIcons>
        </FooterBottom>
        <FooterBottom data-aos="fade-up">
          <FooterText>
            <Icon><MdPhone /></Icon> 1900 - 6666 <span style={{ marginLeft: '20px' }}>Working 8:00 - 22:00</span>
          </FooterText>
          <FooterText>
            <Icon><MdPhone /></Icon> 1900 - 8888 24/7 Support Center <span style={{ marginLeft: '80px' }}></span>
          </FooterText>
        </FooterBottom>
        <FooterText style={{ textAlign: 'center' }} data-aos="fade-up">
          Up to 15% discount on your first subscribe
        </FooterText>
      </FooterContainer>
      <ScrollToTop onClick={scrollToTop}>
        <IoIosArrowUp />
      </ScrollToTop>
    </>
  );
};

export default Footer;
