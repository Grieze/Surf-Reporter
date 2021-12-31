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
        weatherData={degToCompass(currentData?.[41])}
        extraData={''}
        className={'direction-card'}
      />
      <WeatherCard
        weatherDataLabel='Wind Speed'
        weatherData={Math.floor(currentData?.[42] / 0.44704)}
        extraData={'mph'}
        className='wind-speed-card'
      />
    </div>
  );
};

export default CurrWind;
