// src/components/DailyWeather.tsx
import React from 'react';
import './style.css';
import { IWeather } from '../../services/weatherService';
import { formatTime } from '../../helpers/dateformatter';

interface DailyWeatherProps {
  weather: IWeather;
  selectedCity?: string;
}

const DailyWeatherComponent: React.FC<DailyWeatherProps> = ({
  weather,
  selectedCity,
}) => {
  return (
    <div className='daily-weather'>
      <div className='weather-day'>
        {selectedCity + ', ' + formatTime(weather.dt)}
      </div>
      <div className='weather-temps'>
        <span className='temp-day'>Day: {weather.temp.day}°C</span>
        <span className='temp-night'>Night: {weather.temp.night}°C</span>
      </div>
      <div className='weather-description'>
        {weather.weather[0].description}
      </div>
    </div>
  );
};

export default DailyWeatherComponent;
