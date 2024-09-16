import axios from 'axios';

const appId = import.meta.env.VITE_APPID;

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: appId,
    units: 'metric',
  },
});

export interface IWeather {
  dt: number;
  temp: {
    day: number;
    night: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface IWeatherData {
  daily: Array<IWeather>;
}

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  successCallBack: (response: IWeatherData) => void,
  errorCallBack: (error: any) => void,
  finallyCalbback: () => void
) => {
  try {
    const response = await apiClient.get<IWeatherData>('/onecall', {
      params: { lat, lon },
    });
    successCallBack(response.data);
  } catch (error) {
    errorCallBack(error);
  } finally {
    finallyCalbback();
  }
};
