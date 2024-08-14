import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope } from 'react-icons/fa';
import LaptopMockup from '../assets/laptop-mockup.png';
import TabletMockup from '../assets/tabletmoc.png';
import SmartMockup from '../assets/smart.png';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  sendPasswordResetEmail 
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: ".firebaseapp.com",
    projectId: "",
    storageBucket: ".appspot.com",
    messagingSenderId: "=",
    appId: "1::web:YOUR_SPECIFIC_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home', { state: { showSuccessMessage: true } });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError(null);
    setMessage(null);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  return (
    <Container>
      <LeftSection>
        <FormBox>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {message && <SuccessMessage>{message}</SuccessMessage>}

          {!showResetPassword ? (
            <>
              <Title>{isSignup ? 'Create an Account' : 'Welcome back to Nest'}</Title>
              <Subtitle>{isSignup ? 'Sign up to start creating' : 'Log in to your account and start creating'}</Subtitle>

              <SocialButton onClick={handleGoogleSignIn}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google logo" style={{ width: '20px', marginRight: '0.5rem' }} /> {isSignup ? 'Sign up with Google' : 'Sign in with Google'}
              </SocialButton>
              <SocialButton>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple logo" style={{ width: '20px', marginRight: '0.5rem' }} /> {isSignup ? 'Sign up with Apple' : 'Sign in with Apple'}
              </SocialButton>
              <SocialButton>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft logo" style={{ width: '20px', marginRight: '0.5rem' }} /> {isSignup ? 'Sign up with Microsoft' : 'Sign in with Microsoft'}
              </SocialButton>

              <Divider>OR</Divider>

              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                )}
                <Input
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? <Spinner /> : <><FaEnvelope /> {isSignup ? 'Sign up' : 'Sign in with email'}</>}
                </SubmitButton>
              </form>

              <Terms>
                By proceeding, you agree to our <Link href="#">Terms</Link> and acknowledge our <Link href="#">Privacy Policy</Link>
              </Terms>

              <SignUpPrompt onClick={toggleForm}>
                {isSignup ? "Already have an account? " : "Don't have an account? "} <Link href="#">{isSignup ? 'Log in' : 'Sign up'}</Link>
              </SignUpPrompt>

              {!isSignup && (
                <ForgotPassword onClick={() => setShowResetPassword(true)}>
                  Forgot Password?
                </ForgotPassword>
              )}
            </>
          ) : (
            <>
              <Title>Reset Password</Title>
              <Subtitle>Enter your email to receive a password reset link</Subtitle>

              <form onSubmit={handleResetPassword}>
                <Input
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? <Spinner /> : 'Send Reset Link'}
                </SubmitButton>
              </form>

              <BackToLogin onClick={() => setShowResetPassword(false)}>
                Back to Login
              </BackToLogin>
            </>
          )}
        </FormBox>
      </LeftSection>
      <RightSection>
        <DeviceMockup className="laptop">
          <img src={LaptopMockup} alt="Laptop mockup" />
        </DeviceMockup>
        <DeviceMockup className="tablet">
          <img src={TabletMockup} alt="Tablet mockup" />
        </DeviceMockup>
        <DeviceMockup className="smartphone">
          <img src={SmartMockup} alt="Smartphone mockup" />
        </DeviceMockup>
      </RightSection>
    </Container>
  );
};


const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 2px solid green;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 1rem;
  padding: 10px;
  border: 1px solid red;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: -75%;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 14px;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &::before {
    margin-right: .5em;
  }

  &::after {
    margin-left: .5em;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: #333;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }

  &:disabled {
    cursor: not-allowed;
    background: #555;
  }
`;

const Terms = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 1rem;
`;

const Link = styled.a`
  color: #0066ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpPrompt = styled.p`
  font-size: 14px;
  margin-top: 1rem;
  cursor: pointer;
  text-align: center;
`;

const DeviceMockup = styled.div`
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  &.laptop {
    width: 90%;
    top: 20%;
    left: 9%;
    z-index: 1;
    border: 7px solid black;
  }

  &.tablet {
    width: 76%;
    top: 35%;
    right: 18%;
    z-index: 2;
    border: 15px solid black;
  }

  &.smartphone {
    width: 25%;
    height: 338px;
    bottom: 20%;
    left: 15%;
    z-index: 3;
    border: 4px solid black;
    &::before {
      content: '';
      position: absolute;
      width: 90px;
      height: 20px;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      background: black;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
const SuccessMessage = styled(ErrorMessage)`
  color: green;
  border-color: green;
`;

const ForgotPassword = styled.p`
  font-size: 14px;
  color: #0066ff;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BackToLogin = styled(ForgotPassword)`
  margin-top: 2rem;
`;

export default LoginSignup;
