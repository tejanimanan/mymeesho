import React from 'react';
import MainLayout from './MainLayout';

export default function Summary({ cartItems }) {
  return (
    <MainLayout cartItems={cartItems} currentStep={3}>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-lg">Thank you for shopping with us. Your order summary will appear here.</p>
      </div>
    </MainLayout>
  );
} 