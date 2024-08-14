import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled(motion.h2)`
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled(motion.h3)`
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Paragraph = styled(motion.p)`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Image = styled(motion.img)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const TeamMember = styled(motion.div)`
  flex: 1 1 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  padding: 20px;
`;

const MemberPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const MemberName = styled.h4`
  font-size: 18px;
  margin: 0 0 10px;
  color: #333;
`;

const MemberRole = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0;
`;

const ContactSection = styled.div`
  text-align: center;
`;

const ContactInfo = styled.p`
  font-size: 16px;
  color: #666;
`;

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <AboutContainer>
      <Section>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </Title>
        <Subtitle
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Who We Are
        </Subtitle>
        <Paragraph
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Welcome to our e-commerce site! We are dedicated to providing the best online shopping experience. Our mission is to offer a wide range of high-quality products at affordable prices, along with exceptional customer service.
        </Paragraph>
        <Image
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1pc3Npb258ZW58MHx8fHwxNjU3NzI2Mjk3&ixlib=rb-1.2.1&q=80&w=1080"

          alt="Our Company"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </Section>

      <Section>
        <Subtitle
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Our Mission & Values
        </Subtitle>
        <Paragraph
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Our mission is to empower every person to look and feel their best. We value quality, integrity, and community. We strive to make a positive impact by sourcing sustainable products and supporting local artisans.
        </Paragraph>
        <Image
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1pc3Npb258ZW58MHx8fHwxNjU3NzI2Mjk3&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Our Mission"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </Section>

      <Section>
        <Subtitle
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Meet the Team
        </Subtitle>
        <TeamContainer>
          {['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 + index * 0.5 }}
            >
              <MemberPhoto src={`https://randomuser.me/api/portraits/lego/${index + 1}.jpg`} alt={name} />
              <MemberName>{name}</MemberName>
              <MemberRole>Role {index + 1}</MemberRole>
            </TeamMember>
          ))}
        </TeamContainer>
      </Section>

      <ContactSection>
        <Subtitle
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Contact Us
        </Subtitle>
        <ContactInfo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Email: info@ecommerce.com | Phone: (123) 456-7890
        </ContactInfo>
      </ContactSection>
    </AboutContainer>
  );
};

export default About;
