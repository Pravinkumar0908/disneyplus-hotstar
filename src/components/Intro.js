
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d);

    color: #ffffff;
  }

  * {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to-left, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Logo = styled.img`
  height: 40px;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #4ECDC4, #FF6B6B);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const AnimatedBubble = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  animation: ${floatAnimation} ${props => props.duration || '3s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const Headline = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #1a2a6c, #b21f1f, #1a2a6c);
border: 1px solid bllack;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
`;

const Subheadline = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  position: relative;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  margin: 2rem 0;
  border-radius: 20px;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FeatureItem = styled(motion.div)`
  text-align: center;
  max-width: 300px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.i`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const ProductShowcase = styled(Section)`
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 500px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 400px;
  }
`;

const HowItWorksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Step = styled(motion.div)`
  text-align: center;
  max-width: 250px;
`;

const StepNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 1rem;
`;

const TestimonialsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Testimonial = styled(motion.div)`
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  text-align: center;
`;

const NewsletterSection = styled(Section)`
  text-align: center;
`;

const EmailInput = styled.input`
  padding: 0.75rem;
  margin-right: 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
`;

const Footer = styled.footer`
  background: linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #ffffff;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 30px;
    height: 2px;
    background-color: #ffd700;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 50px;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: scale(1.2);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Intro = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [controls]);

  const bubbles = Array.from({ length: 10 }).map((_, i) => ({
    size: Math.random() * 100 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${Math.random() * 5 + 3}s`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header>
          <Logo src="https://via.placeholder.com/150x50" alt="Logo" />
          <Nav>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#products">Products</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </Nav>
          <CTAButton
    as={Link}
    to="/home"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    Get Started
  </CTAButton>
        </Header>

        <HeroSection id="home">
          {bubbles.map((bubble, index) => (
            <AnimatedBubble
              key={index}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                top: bubble.top,
              }}
              duration={bubble.duration}
              delay={bubble.delay}
            />
          ))}
          <Headline
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Perfect Style
          </Headline>
          <Subheadline
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Shop the latest trends in fashion and accessories  Explore our curated collection of fashion-forward pieces designed to elevate your style and keep you ahead of the trends.
          </Subheadline>
          <ButtonContainer>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Explore Now
            </CTAButton>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              Learn More
            </CTAButton>
            <div>

            </div>
          </ButtonContainer>
          </HeroSection>
       <Section id="features">
        
         <SectionTitle>Our Features</SectionTitle>
        <FeaturesContainer>
        <FeatureItem
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
<FeatureIcon className="fas fa-shopping-cart" />
            <h3>Fast Performance</h3>
            <p>Experience lightning speed and efficiency.</p>
          </FeatureItem>
          <FeatureItem
          
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
<FeatureIcon className="fas fa-box" />
            <h3>Top Security</h3>
            <p>Your data is protected with state-of-the-art security.
                
            </p>
          </FeatureItem>
          <FeatureItem
          
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.6 }}
          >
<FeatureIcon className="fas fa-tags" />

            <h3>Customizable</h3>
            <p>Tailor the experience to fit your needs.</p>
          </FeatureItem>
        </FeaturesContainer>
      </Section>
      <ProductShowcase id="product">
        <SectionTitle>Product Showcase</SectionTitle>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
              {bubbles.map((bubble, index) => (
            <AnimatedBubble
              key={index}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                top: bubble.top,
              }}
              duration={bubble.duration}
              delay={bubble.delay}
            />
          ))}
          <SwiperSlide>
            <ProductImage src="product1.jpg" alt="Product 1" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductImage src="product2.jpg" alt="Product 2" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductImage src="product3.jpg" alt="Product 3" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductImage src="product1.jpg" alt="Product 1" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductImage src="product2.jpg" alt="Product 2" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductImage src="product3.jpg" alt="Product 3" />
          </SwiperSlide>
        </Swiper>
      </ProductShowcase>
      <Section id="how-it-works">
        <SectionTitle>How It Works</SectionTitle>
        <HowItWorksContainer>
        {bubbles.map((bubble, index) => (
            <AnimatedBubble
              key={index}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                top: bubble.top,
              }}
              duration={bubble.duration}
              delay={bubble.delay}
            />
          ))}
          <Step
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <StepNumber>1</StepNumber>
            <h3>Sign Up</h3>
            <p>Get started by creating an account.</p>
          </Step>
          <Step
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            <StepNumber>2</StepNumber>
            <h3>Setup</h3>
            <p>Customize your profile and settings.</p>
          </Step>
          <Step
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            <StepNumber>3</StepNumber>
            <h3>Enjoy</h3>
            <p>Start using the platform to its full potential.</p>
          </Step>
        </HowItWorksContainer>
      </Section>
      <Section id="testimonials">
        <SectionTitle>What Our Users Say</SectionTitle>
        <TestimonialsContainer>
          <Testimonial
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <p>"This is the best service I've ever used!"</p>
            <footer>- Happy User</footer>
          </Testimonial>
          <Testimonial
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            <p>"Incredible experience and fantastic support."</p>
            <footer>- Satisfied Customer</footer>
          </Testimonial>
          <Testimonial
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            <p>"I highly recommend this to everyone."</p>
            <footer>- Enthusiastic Client</footer>
          </Testimonial>
        </TestimonialsContainer>
      </Section>
      <NewsletterSection>
        <SectionTitle>Subscribe to Our Newsletter</SectionTitle>
        <p>Stay updated with the latest news and special offers.</p>
        <div>
          <EmailInput type="email" placeholder="Your email" />
          <CTAButton>Subscribe</CTAButton>
        </div>
      </NewsletterSection>

      <Footer>
  {bubbles.map((bubble, index) => (
    <AnimatedBubble
      key={index}
      style={{
        width: bubble.size,
        height: bubble.size,
        left: bubble.left,
        top: bubble.top,
      }}
      duration={bubble.duration}
      delay={bubble.delay}
    />
  ))}
  <FooterContent>
    <FooterSection>
      <FooterTitle>Shop</FooterTitle>
      <FooterLink href="#">New Arrivals</FooterLink>
      <FooterLink href="#">Best Sellers</FooterLink>
      <FooterLink href="#">Sale</FooterLink>
      <FooterLink href="#">Collections</FooterLink>
    </FooterSection>
    <FooterSection>
      <FooterTitle>Customer Service</FooterTitle>
      <FooterLink href="#">Contact Us</FooterLink>
      <FooterLink href="#">Shipping & Returns</FooterLink>
      <FooterLink href="#">FAQ</FooterLink>
      <FooterLink href="#">Size Guide</FooterLink>
    </FooterSection>
    <FooterSection>
      <FooterTitle>About Us</FooterTitle>
      <FooterLink href="#">Our Story</FooterLink>
      <FooterLink href="#">Sustainability</FooterLink>
      <FooterLink href="#">Careers</FooterLink>
      <FooterLink href="#">Press</FooterLink>
    </FooterSection>
    <FooterSection>
      <FooterTitle>Connect With Us</FooterTitle>
      <p>Stay updated with the latest news and special offers.</p>
      <SocialIcons>
        <SocialIcon href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></SocialIcon>
        <SocialIcon href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></SocialIcon>
        <SocialIcon href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></SocialIcon>
        <SocialIcon href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></SocialIcon>
      </SocialIcons>
    </FooterSection>
  </FooterContent>
  <FooterBottom>
    <p>© 2024 Pravin Kumar Store. All rights reserved.</p>
  </FooterBottom>
</Footer>
      </PageContainer>
    </>
  );
};

export default Intro;