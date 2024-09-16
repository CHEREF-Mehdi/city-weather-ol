import React, { useState } from 'react';
import './style.css';

interface CitySearchProps {
  cities: string[];
  onSelectCity: (city: string | undefined) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ cities, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value.trim());
    setIsDropdownOpen(true);
    if (value.trim()) {
      setFilteredCities(
        cities.filter((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredCities([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!searchTerm) {
        onSelectCity(undefined);
      } else {
        if (filteredCities.length) {
          setSearchTerm(filteredCities[0]);
          setIsDropdownOpen(false);
          onSelectCity(filteredCities[0]);
        }
      }
    }
  };

  const handleSelectCity = (city: string) => {
    setSearchTerm(city);
    setIsDropdownOpen(false);
    onSelectCity(city);
  };

  return (
    <div className='city-search'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder='Search city...'
        onFocus={() => setIsDropdownOpen(true)}
        onKeyDown={handleKeyDown}
      />
      <img
        src='https://cdn-icons-png.flaticon.com/512/149/149852.png'
        alt='search icon'
        className='search-icon'
      />
      {isDropdownOpen && filteredCities.length > 0 && (
        <div className='city-search-dropdown'>
          {filteredCities.map((city) => (
            <div
              key={city}
              className='city-search-dropdown-item'
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
