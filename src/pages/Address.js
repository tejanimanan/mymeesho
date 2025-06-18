import React, { useState } from 'react';
import MainLayout from './MainLayout';
import PriceDetailsCard from '../comonent/PriceDetailsCard';

const dummyAddress = {
  id: 1,
  name: 'Tejani Manan',
  address: 'manglam paying guest , swastik char rasta,navrang pura, Ahmedabad , near chamunda deri , Ahmedabad , Gujarat, 380007',
  phone: '9898666545',
};

export default function Address({ cartItems, onContinue }) {
  const [selected, setSelected] = useState(dummyAddress.id);
  return (
    <MainLayout cartItems={cartItems} currentStep={1}>
      <div className="mt-4 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Select Delivery Address</h2>
          <button className="text-purple-700 font-bold">+ ADD NEW ADDRESS</button>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-4 flex flex-col gap-2 relative">
          <div className="absolute left-4 top-4">
            <input type="radio" checked={selected === dummyAddress.id} onChange={() => setSelected(dummyAddress.id)} />
          </div>
          <div className="ml-8">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{dummyAddress.name}</span>
              <button className="text-purple-700 font-bold">EDIT</button>
            </div>
            <div className="text-gray-700 text-sm mb-2">{dummyAddress.address}</div>
            <div className="text-gray-700 text-sm mb-2">{dummyAddress.phone}</div>
            <button
              className="w-full py-3 bg-purple-700 text-white font-bold rounded hover:bg-purple-800 mt-2"
              onClick={onContinue}
            >
              Deliver to this Address
            </button>
          </div>
          <div className="w-full md:w-[350px]">
        </div>
        </div>
          <PriceDetailsCard cartItems={cartItems} />
      </div>
    </MainLayout>
  );
} 