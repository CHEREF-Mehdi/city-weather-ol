// src/components/NavBar.tsx
import React from 'react';
import CitySearch from '../CitySearch';
import './style.css';

interface NavBarProps {
  cities: string[];
  setSetectedCity: (city: string | undefined) => void;
}

const NavBar: React.FC<NavBarProps> = ({ cities, setSetectedCity }) => {
  const handleSelectCity = (city: string | undefined) => {
    setSetectedCity(city);
  };

  return (
    <nav className='navbar'>
      <h1 className='navbar-title'>Weather App</h1>
      <div className='navbar-search'>
        <CitySearch cities={cities} onSelectCity={handleSelectCity} />
      </div>
    </nav>
  );
};

export default NavBar;
