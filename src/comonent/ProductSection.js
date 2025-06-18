import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { motion } from 'framer-motion';
import { FaCartPlus } from 'react-icons/fa';

function ProductSection() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const productsRef = ref(database, "products");
    
        onValue(productsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const productList = Object.values(data);
            setProducts(productList);
          }
        });
      }, []);
  return (
    <div>
        <section className="py-10 md:py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Products For You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder Product Cards - You would map over actual product data here */}
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <span className="text-xl font-bold text-purple-700">
                    ₹{product.price}
                  </span>
                  <div className="flex items-center justify-center mt-2">
                    <button className="bg-purple-600 text-white w-24 px-4 py-2 rounded-md hover:bg-purple-700 transition">
                      View
                    </button>
                    <button className="border text-purple-700 font-bold border-purple-700 px-4 ms-2 py-2 rounded-md transition">
                      <FaCartPlus className="inline" /> Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductSection