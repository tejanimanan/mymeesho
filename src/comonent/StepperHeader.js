import React from 'react';
import { Link } from 'react-router-dom';

const steps = ['Cart', 'Address', 'Payment', 'Summary'];

export default function StepperHeader({ currentStep = 0 }) {
  return (
    <div className="w-full flex flex-col items-center mb-8  border-b border-black/30">
      <div className="flex items-center justify-between w-full  max-w-6xl py-6">
        <Link to="/" className="text-2xl font-bold  shrikhand-regular" >
          MyMeesho
        </Link>
        <div className="flex items-center gap-8">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div
                className={
                  'rounded-full w-8 h-8 flex items-center justify-center font-bold ' +
                  (idx < currentStep
                    ? 'bg-purple-700 text-white'
                    : idx === currentStep
                      ? 'bg-purple-700 text-white ring-4 ring-purple-300'
                      : 'bg-gray-200 text-gray-700')
                }
              >
                {idx + 1}
              </div>
              <span
                className={
                  'ml-2 font-semibold ' +
                  (idx <= currentStep ? 'text-purple-700' : 'text-gray-700')
                }
              >
                {step}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={
                    'w-8 h-1 mx-2 rounded ' +
                    (idx < currentStep ? 'bg-purple-700' : 'bg-gray-300')
                  }
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 