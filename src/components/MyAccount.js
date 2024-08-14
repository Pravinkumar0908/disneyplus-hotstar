import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaUser, FaEnvelope, FaShoppingBag, FaHeart, FaCog, FaUpload, FaTrash, FaBox, FaTruck, FaCheckCircle, FaClipboardList, FaCreditCard, FaMapMarkerAlt, FaBell } from 'react-icons/fa';

const MyAccount = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    isActive: true,
    address: '',
    paymentMethods: [],
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=68',
        isActive: true,
        address: '123 Main St, City, Country',
        paymentMethods: ['Visa ending in 1234', 'PayPal'],
      });
      setOrders([
        { id: 1, status: 'Processing', items: ['Premium T-Shirt', 'Designer Jeans'], total: 129.99 },
        { id: 2, status: 'Shipped', items: ['Wireless Headphones'], total: 79.99 },
        { id: 3, status: 'Delivered', items: ['Smartwatch', 'Fitness Tracker'], total: 249.99 },
      ]);
      setWishlist([
        { id: 1, name: 'Leather Jacket', price: 199.99 },
        { id: 2, name: 'Running Shoes', price: 89.99 },
      ]);
      setNotifications([
        { id: 1, message: 'Your order #1234 has been shipped!', isRead: false },
        { id: 2, message: 'New items added to your wishlist are now on sale!', isRead: true },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated user data to your backend
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const toggleAccountStatus = () => {
    setUser(prevUser => ({ ...prevUser, isActive: !prevUser.isActive }));
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <FaBox />;
      case 'Shipped': return <FaTruck />;
      case 'Delivered': return <FaCheckCircle />;
      default: return <FaShoppingBag />;
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-account"
    >
      <h1>My Account</h1>
      <div className="account-container">
        <motion.div
          className="sidebar"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="avatar-container">
            <motion.img 
              src={user.avatar} 
              alt="User Avatar" 
              className="avatar"
              whileHover={{ scale: 1.1 }}
              whileTap={{ rotate: 360, transition: { duration: 0.5 } }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              <FaUpload />
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {user.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {user.email}
          </motion.p>
          <nav>
            {[
              { name: 'profile', icon: <FaUser /> },
              { name: 'orders', icon: <FaShoppingBag /> },
              { name: 'wishlist', icon: <FaHeart /> },
              { name: 'notifications', icon: <FaBell /> },
              { name: 'settings', icon: <FaCog /> },
            ].map(({ name, icon }) => (
              <motion.button
                key={name}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(name)}
                className={activeTab === name ? 'active' : ''}
              >
                {icon}
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </motion.button>
            ))}
          </nav>
        </motion.div>
        <div className="content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'profile' && (
                <div className="profile-info">
                  <h3>Profile Information</h3>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                      <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="save-button"
                        onClick={handleSave}
                      >
                        Save Changes
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <p><FaUser /> Name: {user.name}</p>
                      <p><FaEnvelope /> Email: {user.email}</p>
                      <p><FaMapMarkerAlt /> Address: {user.address}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="edit-button"
                        onClick={handleEdit}
                      >
                        Edit Profile
                      </motion.button>
                    </>
                  )}
                </div>
              )}
              {activeTab === 'orders' && (
                <div className="order-history">
                  <h3>Order History</h3>
                  {orders.length > 0 ? (
                    <ul className="order-list">
                      {orders.map(order => (
                        <motion.li
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="order-item"
                        >
                          <div className="order-header">
                            <span>{getOrderStatusIcon(order.status)}</span>
                            <h4>Order #{order.id}</h4>
                            <span className="order-status">{order.status}</span>
                          </div>
                          <ul className="order-products">
                            {order.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                          <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p>You have no recent orders.</p>
                  )}
                </div>
              )}
              {activeTab === 'wishlist' && (
                <div className="wishlist">
                  <h3>My Wishlist</h3>
                  {wishlist.length > 0 ? (
                    <ul className="wishlist-items">
                      {wishlist.map(item => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>{item.name}</span>
                          <span>${item.price.toFixed(2)}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            Remove
                          </motion.button>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p>Your wishlist is empty.</p>
                  )}
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="notifications">
                  <h3>Notifications</h3>
                  {notifications.length > 0 ? (
                    <ul className="notification-list">
                      {notifications.map(notif => (
                        <motion.li
                          key={notif.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={notif.isRead ? 'read' : 'unread'}
                        >
                          <p>{notif.message}</p>
                          {!notif.isRead && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => markNotificationAsRead(notif.id)}
                            >
                              Mark as Read
                            </motion.button>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p>No new notifications.</p>
                  )}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="settings">
                  <h3>Account Settings</h3>
                  <div className="account-status">
                    <p>Account Status: {user.isActive ? 'Active' : 'Inactive'}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`status-toggle ${user.isActive ? 'active' : 'inactive'}`}
                      onClick={toggleAccountStatus}
                    >
                      {user.isActive ? 'Deactivate Account' : 'Activate Account'}
                    </motion.button>
                  </div>
                  <div className="payment-methods">
                    <h4>Payment Methods</h4>
                    <ul>
                      {user.paymentMethods.map((method, index) => (
                        <li key={index}><FaCreditCard /> {method}</li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="add-payment"
                    >
                      Add New Payment Method
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="delete-account"
                  >
                    <FaTrash /> Delete Account
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="ecommerce-guidelines">
        <h3>E-commerce Guidelines</h3>
        <ul>
          <li>All transactions are secure and encrypted.</li>
          <li>We offer a 30-day return policy on most items.</li>
          <li>Free shipping on orders over $50.</li>
          <li>Contact customer support for any issues with your order.</li>
          <li>Check our FAQ for common questions and answers.</li>
        </ul>
      </div>
      <style jsx>{`
        .my-account {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
          color: #333;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        h1, h2, h3, h4 {
          color: #2c3e50;
        }

        .account-container {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .sidebar {
          flex: 1;
          background: #2c3e50;
          padding: 20px;
          color: #ecf0f1;
        }

        .avatar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .avatar {
          border-radius: 50%;
          width: 120px;
          height: 120px;
          object-fit: cover;
          border: 3px solid #ecf0f1;
          margin-bottom: 10px;
        }

        .upload-button {
          background: #3498db;
          border: none;
          color: #fff;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar nav button {
          display: flex;
          align-items: center;
          background: transparent;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          color: #ecf0f1;
          border-radius: 5px;
          transition: background 0.3s;
          font-size: 16px;
          margin: 5px 0;
          width: 100%;
          text-align: left;
        }

        .sidebar nav button.active {
          background: rgba(236, 240, 241, 0.1);
        }

        .sidebar nav button svg {
          margin-right: 10px;
        }

        .content {
          flex: 3;
          padding: 30px;
        }

        .profile-info input {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .edit-button, .save-button, .add-payment {
          background: #2ecc71;
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }

        .order-history .order-item {
          background: #f9f9f9;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .order-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .order-status {
          font-weight: bold;
          color: #3498db;
        }

        .order-products {
          list-style: none;
          padding: 0;
        }

        .order-total {
          font-weight: bold;
          margin-top: 10px;
        }

        .wishlist-items {
          list-style: none;
          padding: 0;
        }

        .wishlist-items li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        .wishlist-items button {
          background: #e74c3c;
          color: #fff;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }

        .notification-list {
          list-style: none;
          padding: 0;
        }

        .notification-list li {
          background: #f9f9f9;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 10px;
        }

        .notification-list li.unread {
          border-left: 4px solid #3498db;
        }

        .settings .account-status {
          margin-bottom: 20px;
        }

        .status-toggle {
          background: #e74c3c;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }

        .status-toggle.active {
          background: #2ecc71;
        }

        .payment-methods ul {
          list-style: none;
          padding: 0;
        }

        .payment-methods li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .payment-methods li svg {
          margin-right: 10px;
          color: #3498db;
        }

        .delete-account {
          background: #e74c3c;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
          display: flex;
          align-items: center;
        }

        .delete-account svg {
          margin-right: 10px;
        }

        .ecommerce-guidelines {
          background: #ecf0f1;
          padding: 20px;
          border-radius: 5px;
          margin-top: 30px;
        }

        .ecommerce-guidelines ul {
          padding-left: 20px;
        }

        .ecommerce-guidelines li {
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .account-container {
            flex-direction: column;
          }

          .sidebar {
            order: 2;
          }

          .content {
            order: 1;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MyAccount; 