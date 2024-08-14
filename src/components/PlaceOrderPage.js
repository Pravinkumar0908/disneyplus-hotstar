// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTruck, FaCreditCard, FaCheck } from 'react-icons/fa';

// const PageContainer = styled(motion.div)`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: 'Roboto', sans-serif;
// `;

// const Title = styled.h2`
//   text-align: center;
//   color: #333;
//   margin-bottom: 30px;
// `;

// const FormContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

// const AddressForm = styled(motion.form)`
//   flex: 1;
//   min-width: 300px;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const PaymentDetails = styled(motion.div)`
//   flex: 1;
//   min-width: 300px;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Button = styled(motion.button)`
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   padding: 15px 30px;
//   font-size: 18px;
//   border-radius: 8px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
//   width: 100%;
// `;

// const OrderSummary = styled.div`
//   margin-top: 20px;
// `;

// const SummaryItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 10px;
// `;

// const PlaceOrderPage = ({ cart }) => {
//   const [step, setStep] = useState(1);
//   const [shippingAddress, setShippingAddress] = useState({
//     fullName: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: '',
//   });
//   const [paymentMethod, setPaymentMethod] = useState('creditCard');

//   const handleAddressChange = (e) => {
//     setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
//   };

//   const handleSubmitAddress = (e) => {
//     e.preventDefault();
//     setStep(2);
//   };

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handlePlaceOrder = () => {
//     // Here you would typically integrate with a real payment gateway
//     // For this example, we'll just simulate a successful payment
//     setTimeout(() => {
//       alert('Order placed successfully!');
//       // Redirect to order confirmation page or clear cart
//     }, 2000);
//   };

//   const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   const shipping = 10;
//   const total = subtotal + shipping;

//   return (
//     <PageContainer
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <Title>Place Your Order</Title>
//       <FormContainer>
//         <AnimatePresence>
//           {step === 1 && (
//             <AddressForm
//               key="addressForm"
//               initial={{ x: -300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: 300, opacity: 0 }}
//               onSubmit={handleSubmitAddress}
//             >
//               <h3><FaTruck /> Shipping Address</h3>
//               <Input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={shippingAddress.fullName}
//                 onChange={handleAddressChange}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={shippingAddress.address}
//                 onChange={handleAddressChange}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={shippingAddress.city}
//                 onChange={handleAddressChange}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={shippingAddress.postalCode}
//                 onChange={handleAddressChange}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={shippingAddress.country}
//                 onChange={handleAddressChange}
//                 required
//               />
//               <Button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Continue to Payment
//               </Button>
//             </AddressForm>
//           )}

//           {step === 2 && (
//             <PaymentDetails
//               key="paymentDetails"
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//             >
//               <h3><FaCreditCard /> Payment Details</h3>
//               <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
//                 <option value="creditCard">Credit Card</option>
//                 <option value="paypal">PayPal</option>
//                 <option value="bankTransfer">Bank Transfer</option>
//               </Select>
//               {paymentMethod === 'creditCard' && (
//                 <>
//                   <Input type="text" placeholder="Card Number" required />
//                   <Input type="text" placeholder="Name on Card" required />
//                   <Input type="text" placeholder="Expiry Date" required />
//                   <Input type="text" placeholder="CVV" required />
//                 </>
//               )}
//               <OrderSummary>
//                 <h4>Order Summary</h4>
//                 <SummaryItem>
//                   <span>Subtotal:</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </SummaryItem>
//                 <SummaryItem>
//                   <span>Shipping:</span>
//                   <span>${shipping.toFixed(2)}</span>
//                 </SummaryItem>
//                 <SummaryItem>
//                   <strong>Total:</strong>
//                   <strong>${total.toFixed(2)}</strong>
//                 </SummaryItem>
//               </OrderSummary>
//               <Button
//                 onClick={handlePlaceOrder}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FaCheck style={{ marginRight: '10px' }} />
//                 Place Order
//               </Button>
//             </PaymentDetails>
//           )}
//         </AnimatePresence>
//       </FormContainer>
//     </PageContainer>
//   );
// };

// export default PlaceOrderPage;