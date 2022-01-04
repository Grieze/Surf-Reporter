import { useState, useEffect } from 'react';
import WeatherCard from './weather-card/WeatherCard';
import degToCompass from '../utils';

const CurrWind = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
    // console.log('data', data);
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <WeatherCard
        weatherDataLabel={'Wind Direction'}
        weatherData={degToCompass(currentData?.[0].windDirection.data)}
        extraData={currentData?.[0].windDirection.unit}
        className={currentData?.[0].windDirection.className}
      />
      <WeatherCard
        weatherDataLabel='Wind Speed'
        weatherData={currentData?.[0].windSpeed.data}
        extraData={currentData?.[0].windSpeed.unit}
        className={currentData?.[0].windSpeed.className}
      />
    </div>
  );
};

export default CurrWind;
