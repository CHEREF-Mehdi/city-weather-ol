// src/components/NavBar.tsx
import React from 'react';
import CitySearchComponent from '../CitySearch';
import './style.css';

interface NavBarProps {
  cities: string[];
  setSetectedCity: (city: string | undefined) => void;
  selectedCity?: string;
}

const NavBarComponent: React.FC<NavBarProps> = ({
  cities,
  setSetectedCity,
  selectedCity,
}) => {
  const handleSelectCity = (city: string | undefined) => {
    setSetectedCity(city);
  };

  return (
    <nav className='navbar'>
      <h1 className='navbar-title'>Weather App</h1>
      <div className='navbar-search'>
        <CitySearchComponent
          cities={cities}
          onSelectCity={handleSelectCity}
          selectedCity={selectedCity}
        />
      </div>
    </nav>
  );
};

export default NavBarComponent;
