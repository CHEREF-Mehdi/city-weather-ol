import React from 'react';
import './App.css';
import MapComponent from './components/Map';
import NavBarComponent from './components/NavBar';
import { cities } from './helpers/cities';

const App: React.FC = () => {
  const [selectedCity, setSetectedCity] = React.useState<string>();

  return (
    <>
      <NavBarComponent
        setSetectedCity={setSetectedCity}
        cities={Object.entries(cities).map(([city]) => {
          return city;
        })}
      />
      <MapComponent selectedCity={selectedCity} />
    </>
  );
};

export default App;
