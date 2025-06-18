import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // adjust path
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { FaCartPlus, FaSignOutAlt } from 'react-icons/fa';
// import Navbar from '../comonent/NavBar';
import ProductSection from '../comonent/ProductSection';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  // Load current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  
  


  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar user={user} /> */}
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Smart Shopping <br /> Trusted by Millions
            </motion.h1>
            <motion.button
              className="bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Shop Now
            </motion.button>
          </div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img
              src="/images/mymeesho.png"
              alt="Smart Shopping"
              className="w-full max-w-md h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 to-indigo-900 opacity-20"></div>
      </motion.section>

      {/* Feature Highlights */}
      <section className="bg-white shadow-sm py-6 md:py-8">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap justify-around items-center text-gray-700 text-center">
          <motion.div
            className="flex items-center space-x-2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="text-xl">🚚</span>
            <span className="font-semibold">7 Days Easy Return</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="text-xl">💵</span>
            <span className="font-semibold">Cash on Delivery</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <span className="text-xl">💰</span>
            <span className="font-semibold">Lowest Prices</span>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Ethnic Wear', img: 'https://images.meesho.com/images/marketing/1744634654837.webp' },
              { name: 'Western Dresses', img: 'https://images.meesho.com/images/marketing/1744634725496.webp' },
              { name: 'Menswear', img: 'https://images.meesho.com/images/marketing/1744634780426.webp' },
              { name: 'Footwear', img: 'https://images.meesho.com/images/marketing/1744634814643.webp' },
              { name: 'Home Decor', img: 'https://images.meesho.com/images/marketing/1744634835018.webp' },
              { name: 'Beauty', img: 'https://images.meesho.com/images/marketing/1744634871107.webp' },
              { name: 'Accessories', img: 'https://images.meesho.com/images/marketing/1744634909968.webp' },
              { name: 'Grocery', img: 'https://images.meesho.com/images/marketing/1744634937295.webp' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />
                <p className="p-4 text-center font-medium text-gray-700">
                  {category.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products For You */}
      <ProductSection/>
    </div>
  );
};

export default HomePage;
