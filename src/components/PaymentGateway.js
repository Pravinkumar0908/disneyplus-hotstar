import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const PopupContent = styled.div`
  background: linear-gradient(135deg, #00b09b, #96c93d);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.5s ease-out, ${pulse} 2s infinite;
  max-width: 90%;
  width: 400px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;

  &::before {
    content: '✓';
    font-size: 50px;
    color: #00b09b;
  }
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: #ffffff;
  color: #00b09b;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #00b09b;
    color: #ffffff;
  }
`;

const PaymentGateway = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState([
    {
      name: 'Pravin Kumar Verma',
      phone: '9783761084',
      address: '7, Indian Oil Petrol Pump, Indragarh, Rajasthan - 323613',
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    }
  }, [location]);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    console.log('Add new address');
  };

  const handleDeliverHere = () => {
    setOrderSummaryVisible(true);
    setActiveStep(3);
  };

  const handleContinueToPayment = () => {
    setActiveStep(4);
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleContinuePayment = () => {
    if (selectedPayment) {
      setPaymentSuccess(true);
      // Clear the cart
      localStorage.removeItem('cart');
      setTimeout(() => {
        setPaymentSuccess(false);
        navigate('/order-confirmation');
      }, 3000);
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="payment-gateway">
      <div className="container">
        <div className="steps">
          {/* Step 1: Login */}
          {activeStep === 1 && (
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-title">Login</div>
              <div className="step-content">
                <p>+919783761084</p>
                <button onClick={() => handleStepChange(2)}>Next</button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Address */}
          {activeStep === 2 && (
            <div className="step active">
              <div className="step-number">2</div>
              <div className="step-title">Delivery Address</div>
              <div className="step-content">
                <div className="address-list">
                  {deliveryAddress.map((address, index) => (
                    <div
                      key={index}
                      className={`address-item ${selectedAddress === address ? 'selected' : ''}`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === address}
                        onChange={() => handleAddressSelect(address)}
                      />
                      <div className="address-info">
                        <div className="address-name">{address.name}</div>
                        <div className="address-phone">{address.phone}</div>
                        <div className="address-text">{address.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedAddress && (
                  <button className="deliver-here-button" onClick={handleDeliverHere}>
                    Deliver Here
                  </button>
                )}
                <button className="add-address-button" onClick={handleAddAddress}>
                  Add New Address
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Summary */}
          {activeStep === 3 && (
            <div className="step active">
              <div className="step-number">3</div>
              <div className="step-title">Order Summary</div>
              <div className="step-content">
                {orderSummaryVisible && orderData && (
                  <div className="order-summary">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="order-summary-item">
                        <div className="order-summary-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="order-summary-item-details">
                          <div className="order-summary-item-details-title">{item.name}</div>
                          <div className="order-summary-item-details-color">{item.color}, {item.size}</div>
                          <div className="order-summary-item-details-seller">Seller: {item.seller}</div>
                          <div className="order-summary-item-details-price">
                            <span className="order-summary-item-details-price-original">₹{item.originalPrice.toLocaleString()}</span>
                            <span className="order-summary-item-details-price-discount">₹{item.price.toLocaleString()}</span>
                            <span className="order-summary-item-details-price-discount-percentage">
                              {Math.round((1 - item.price / item.originalPrice) * 100)}% Off
                            </span>
                          </div>
                          <div className="order-summary-item-details-quantity">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="order-summary-total">
                      <div>Total Amount: ₹{orderData.totalAmount.toLocaleString()}</div>
                    </div>
                    <button className="continue-button" onClick={handleContinueToPayment}>
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Payment Options */}
          {activeStep === 4 && (
            <div className="step active">
              <div className="step-number">4</div>
              <div className="step-title">Payment Options</div>
              <div className="step-content">
                <div className="payment-options">
                  <div className="header">
                    <span className="number">4</span>
                    <h2>PAYMENT OPTIONS</h2>
                  </div>
                  <div className="timer">
                    Complete payment in <span>00:13:46</span>
                  </div>
                  <div className="options">
                    {[
                      {
                        id: 'phonepe-upi-1',
                        label: 'Phonepe UPI',
                        details: '83026664517@ybl',
                        icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png',
                      },
                      {
                        id: 'phonepe-upi-2',
                        label: 'Phonepe UPI',
                        details: 'pravinbairwa584@ybl',
                        icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png',
                      },
                      {
                        id: 'upi',
                        label: 'UPI',
                        details: 'Pay by any UPI app',
                        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROIppzLqCf0VqsxIo3tBzMe2OzdipG3iIMIg&s',
                      },
                      {
                        id: 'wallets',
                        label: 'Wallets',
                        details: '',
                        icon: 'https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png',
                      },
                      {
                        id: 'credit-card',
                        label: 'Credit / Debit / ATM Card',
                        details: 'Add and secure cards as per RBI guidelines',
                        icon: '/credit-card-icon.png',
                      },
                      {
                        id: 'net-banking',
                        label: 'Net Banking',
                        details: '',
                        icon: '/net-banking-icon.png',
                      },
                      {
                        id: 'cash-on-delivery',
                        label: 'Cash on Delivery',
                        details: '',
                        icon: '/cash-on-delivery-icon.png',
                      },
                      {
                        id: 'emi',
                        label: 'EMI (Easy Installments)',
                        details: 'Not applicable',
                        icon: '/emi-icon.png',
                      },
                      {
                        id: 'add-gift-card',
                        label: 'Add Gift Card',
                        details: '',
                        icon: '/gift-card-icon.png',
                      },
                    ].map(option => (
                      <div className="option" key={option.id}>
                        <input
                          type="radio"
                          name="payment"
                          id={option.id}
                          checked={selectedPayment === option.id}
                          onChange={() => handlePaymentSelect(option.id)}
                        />
                        <label htmlFor={option.id}>
                          <div className="option-icon">
                            <img src={option.icon} alt={option.label} />
                          </div>
                          <div className="option-details">
                            <div className="option-label">{option.label}</div>
                            {option.details && <div className="option-details-text">{option.details}</div>}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <button className="continue-payment-button" onClick={handleContinuePayment}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {paymentSuccess && (
          <PopupContainer>
            <PopupContent>
              <SuccessIcon />
              <Title>Payment Successful!</Title>
              <Message>Thank you for your order. Your transaction has been completed successfully.</Message>
              <CloseButton onClick={() => setPaymentSuccess(false)}>Close</CloseButton>
            </PopupContent>
          </PopupContainer>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;