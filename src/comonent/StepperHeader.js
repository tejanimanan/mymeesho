import React from 'react';

const steps = ['Cart', 'Address', 'Payment', 'Summary'];

export default function StepperHeader({ currentStep = 0 }) {
  return (
    <div className="w-full flex flex-col items-center mb-8">
      <div className="flex items-center justify-between w-full max-w-6xl py-6">
        {/* <img src="/images/mymeesho.png" alt="logo" className="h-10" /> */}
        <div className="flex items-center gap-8">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold ${idx === currentStep ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {idx + 1}
              </div>
              <span className={`ml-2 font-semibold ${idx === currentStep ? 'text-purple-700' : 'text-gray-700'}`}>{step}</span>
              {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2 rounded"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 