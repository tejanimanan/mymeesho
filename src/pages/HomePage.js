import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // adjust path
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import Navbar from '../comonent/NavBar';

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
     <motion.div
      className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
        
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={
            user.photoURL ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome, {user.displayName || 'User'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">{user.email}</p>

        
      </div>
    </motion.div>
   </div>
  );
};

export default HomePage;
