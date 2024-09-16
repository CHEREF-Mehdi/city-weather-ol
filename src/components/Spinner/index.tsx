// src/components/Spinner.tsx
import React from 'react';
import './style.css';

const SpinnerComponent: React.FC = () => {
  return (
    <div className='spinner-container'>
      <div className='spinner'></div>
    </div>
  );
};

export default SpinnerComponent;
