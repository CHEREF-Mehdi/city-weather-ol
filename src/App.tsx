import React from 'react';
import './App.css';
import MapComponent from './components/Map';
import NavBarComponent from './components/NavBar';
import { cities, getCoordinate } from './helpers/cities';
import { fetchWeatherData, IWeatherData } from './services/weatherService';
import { WeatherWidgetComponent } from './components/weatherWidget';

const App: React.FC = () => {
  const [selectedCity, setSetectedCity] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState<IWeatherData>({
    daily: [],
  });

  React.useEffect(() => {
    if (selectedCity) {
      const coordinate = getCoordinate(selectedCity);

      if (coordinate.length) {
        setLoading(true);
        fetchWeatherData(
          coordinate[0],
          coordinate[1],
          (response) => {
            setWeatherData(response);
          },
          (error: any) => {
            console.error('Failed to fetch weather data', error);
            throw error;
          },
          () => {
            setLoading(false);
          }
        );
      }
    } else {
      setWeatherData({ daily: [] });
    }
  }, [selectedCity]);

  return (
    <>
      <NavBarComponent
        selectedCity={selectedCity}
        setSetectedCity={setSetectedCity}
        cities={Object.keys(cities).map((city) => city)}
      />
      <div style={{ display: 'flex', height: '100%' }}>
        <MapComponent
          selectedCity={selectedCity}
          setSetectedCity={setSetectedCity}
        />
        <WeatherWidgetComponent
          loading={loading}
          daily={weatherData.daily}
          selectedCity={selectedCity}
        ></WeatherWidgetComponent>
      </div>
    </>
  );
};

export default App;
