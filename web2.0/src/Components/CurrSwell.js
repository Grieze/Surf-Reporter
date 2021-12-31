import { useState, useEffect } from 'react';
import WeatherCard from './weather-card/WeatherCard';

const CurrSwell = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/swell');
    const data = await response.json();
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <WeatherCard
        weatherDataLabel='Wave Height'
        weatherData={currentData?.[33]}
        extraData={'ft'}
        className={'height-card'}
      />
      <WeatherCard
        weatherDataLabel='Swell Height'
        weatherData={currentData?.[34]}
        extraData={'ft'}
        className={'height-card'}
      />
      <WeatherCard
        weatherDataLabel='Swell Period'
        weatherData={currentData?.[35]}
        extraData={'secs'}
        className={'period-card'}
      />
      <WeatherCard
        weatherDataLabel='Wind Wave Height'
        weatherData={currentData?.[36]}
        extraData={'ft'}
        className={'height-card'}
      />
      <WeatherCard
        weatherDataLabel='Wind Wave Period'
        weatherData={currentData?.[37]}
        extraData={'secs'}
        className={'period-card'}
      />
      <WeatherCard
        weatherDataLabel={'Swell Direction'}
        weatherData={currentData?.[38]}
        extraData={''}
        className={'direction-card'}
      />
      <WeatherCard
        weatherDataLabel={'Wind Wave Direction'}
        weatherData={currentData?.[39]}
        extraData={''}
        className={'direction-card'}
      />
      <WeatherCard
        weatherDataLabel={'Steepness'}
        weatherData={currentData?.[40] === 'N/A' ? 'FLAT' : currentData?.[40]}
        extraData={''}
        className={'direction-card'}
      />
    </div>
  );
};

export default CurrSwell;
