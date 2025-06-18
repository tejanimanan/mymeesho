import React from 'react';

export default function PriceDetailsCard({ cartItems = [] }) {
  const totalProductPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = 45; // Example static discount
  const orderTotal = totalProductPrice - totalDiscount;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h4 className="font-bold mb-4">Price Details ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})</h4>
      <div className="flex justify-between mb-2">
        <span>Total Product Price</span>
        <span>₹{totalProductPrice}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Total Discounts</span>
        <span className="text-green-600">-₹{totalDiscount}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg mb-2">
        <span>Order Total</span>
        <span>₹{orderTotal}</span>
      </div>
      <div className="bg-green-100 text-green-700 rounded p-2 text-sm mb-3">
        <span>Yay! Your total discount is ₹{totalDiscount}</span>
      </div>
      <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
        <img src="/images/mymeesho.png" alt="safe" className="w-6 h-6" />
        <span>
          <b>Your Safety, Our Priority</b>
          <br />
          We make sure that your package is safe at every point of contact.
        </span>
      </div>
    </div>
  );
} 