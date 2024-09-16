import React, { useState, useEffect } from 'react';
import './style.css';

interface CitySearchProps {
  cities: string[];
  onSelectCity: (city: string | undefined) => void;
  selectedCity?: string;
}

const CitySearchComponent: React.FC<CitySearchProps> = ({
  cities,
  onSelectCity,
  selectedCity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([...cities]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // update input search value when the city is selected by clicking on the map
    if (searchTerm !== selectedCity) {
      setSearchTerm(selectedCity || '');
    }
  }, [selectedCity]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (!searchTerm) {
        onSelectCity(undefined);
      } else {
        if (filteredCities.length) {
          setSearchTerm(filteredCities[0]);
          onSelectCity(filteredCities[0]);
        }
      }
      setIsDropdownOpen(false);
    }
  };

  const handleSearchInputFocus = () => {
    setFilteredCities([...cities]);
    setIsDropdownOpen(true);
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
        placeholder='Search city...'
        value={searchTerm}
        onChange={handleSearchInputChange}
        onFocus={handleSearchInputFocus}
        onKeyDown={handleSearchInputKeyDown}
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

export default CitySearchComponent;
