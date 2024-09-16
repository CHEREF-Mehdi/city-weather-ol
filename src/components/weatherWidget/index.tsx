import * as React from 'react';
import { IWeatherData } from '../../services/weatherService';
import DailyWeatherComponent from '../DailyWeather';
import SpinnerComponent from '../Spinner';

interface IWeatherWidgettProps extends IWeatherData {
  loading: boolean;
  selectedCity?: string;
}

export const WeatherWidgetComponent: React.FC<IWeatherWidgettProps> = ({
  daily,
  loading,
  selectedCity,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
      }}
    >
      {loading ? (
        <SpinnerComponent></SpinnerComponent>
      ) : (
        daily.map((weather) => (
          <DailyWeatherComponent
            key={weather.dt}
            weather={weather}
            selectedCity={selectedCity}
          ></DailyWeatherComponent>
        ))
      )}
    </div>
  );
};
