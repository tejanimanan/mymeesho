import React, { useState } from 'react';
import MainLayout from './MainLayout';

export default function Payment({ cartItems, onContinue }) {
  const [selected, setSelected] = useState('cod');
  const totalProductPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = 90;
  const onlinePrice = totalProductPrice - totalDiscount;

  return (
    <MainLayout cartItems={cartItems} currentStep={2}>
      <div className="mt-4 w-3xl">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <div className="mb-4">
          <div
            className={`flex items-center justify-between border-2 rounded-lg p-4 mb-2 cursor-pointer ${selected === 'cod' ? 'border-purple-700 bg-purple-50' : 'border-gray-200'}`}
            onClick={() => setSelected('cod')}
          >
            <span className="text-lg font-bold">₹{totalProductPrice}</span>
            <span className="ml-4 font-semibold">Cash on Delivery <span role="img" aria-label="cash">💳</span></span>
            <span className={`ml-auto ${selected === 'cod' ? 'text-purple-700' : 'text-gray-400'}`}>{selected === 'cod' ? '✔' : ''}</span>
          </div>
          <div
            className={`flex flex-col border-2 rounded-lg p-4 mb-2 cursor-pointer ${selected === 'online' ? 'border-purple-700 bg-purple-50' : 'border-gray-200'}`}
            onClick={() => setSelected('online')}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="line-through text-gray-400 mr-2">₹{totalProductPrice}</span>
                <span className="text-green-600 font-bold text-lg">₹{onlinePrice}</span>
                <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Save ₹{totalDiscount}</span>
              </div>
              <span className="ml-4 font-semibold">Pay Online <span role="img" aria-label="online">🇮🇳</span></span>
              <span className={`ml-auto ${selected === 'online' ? 'text-purple-700' : 'text-gray-400'}`}>{selected === 'online' ? '✔' : ''}</span>
            </div>
            <div className="text-green-700 text-xs mt-2">Extra discount with bank offers</div>
          </div>
        </div>
        <button
          className="w-full py-3 bg-purple-700 text-white font-bold rounded hover:bg-purple-800 mb-2"
          onClick={onContinue}
        >
          Continue
        </button>
        
      </div>
    </MainLayout>
  );
} 