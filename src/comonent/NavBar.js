import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
const Navbar = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };
    const categories = [
        'Women',
        'Men',
        'Kids',
        'Home & Kitchen',
        'Beauty & Health',
        'Jewellery',
        'Electronics',
    ];

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            {/* Top section */}
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between">
                {/* Brand and Search */}
                <div className="flex items-center justify-between w-full md:w-auto space-x-2">
                    {/* Logo Image */}
                    <img
                        src="/images/mymeesho.png" // make sure it's placed in the /public/images folder
                        alt="MyMeesho Logo"
                        className="w-14 h-12 object-contain"
                    />

                    {/* Brand Name */}
                    <Link to="/" className="text-2xl font-bold text-purple-700">
                        MyMeesho
                    </Link>
                </div>

                {/* Search bar */}
                <div className="mt-2 md:mt-0 flex-1 md:mx-6">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Icons */}
                <div className="mt-2 md:mt-0 flex items-center space-x-4 relative">
                    {/* Profile Button */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition"
                    >
                        <FaUserCircle size={24} />
                        <span className="hidden sm:inline text-sm font-medium">
                            {user?.displayName ? `Hi, ${user.displayName}` : 'Profile'}
                        </span>
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-10 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
                            >
                                {/* Profile Info */}
                                <div className="px-4 py-3 border-b bg-gray-50">
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {user?.displayName || 'Hello User'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                </div>

                                {/* Dropdown Menu */}
                                <ul className="text-gray-700 text-sm">
                                    <li className="hover:bg-purple-50 px-4 py-2 cursor-pointer">View Profile</li>
                                    <li className="hover:bg-purple-50 px-4 py-2 cursor-pointer">My Orders</li>
                                    <li className="hover:bg-purple-50 px-4 py-2 cursor-pointer">Delete Account</li>
                                    <li onClick={handleLogout} className="hover:bg-purple-100 px-4 py-2 text-red-500 cursor-pointer">Logout</li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Cart Icon */}
                    <Link to="/cart" className="text-gray-700 hover:text-purple-700 transition">
                        <FaShoppingCart size={22} />
                    </Link>
                </div>
            </div>

            {/* Bottom categories menu */}
            <div className="bg-gray-50 border-t">
                <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-wrap gap-4 text-sm font-medium text-gray-700 overflow-x-auto whitespace-nowrap">
                    {categories.map((cat) => (
                        <Link key={cat} to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-purple-700">
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
