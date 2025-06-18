import React from 'react';
import PriceDetailsCard from '../comonent/PriceDetailsCard';
import StepperHeader from '../comonent/StepperHeader';

export default function MainLayout({ children, cartItems, currentStep }) {
  return (
    <div>
      {/* <StepperHeader /> */}
      <StepperHeader currentStep={currentStep} />
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto justify-center  ">
        <div className="">{children}</div>
        
      </div>
    </div>
  );
}
