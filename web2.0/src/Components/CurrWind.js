import { useState, useEffect } from 'react';

import WeatherCard from './weather-card/WeatherCard';

const CurrWind = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/reports');
    const data = await response.json();
    setCurrentData(data);
  };

  const testEndpoint = async () => {
    const response = await fetch('http://localhost:8000/wat');
    const data = await response.text();
    console.log('WAT IS THIS', data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={testEndpoint}>WAT</button>
      <WeatherCard
        weatherDataLabel={'Wind Direction'}
        weatherData={currentData?.currWindInfo?.windDirection}
      />
      <WeatherCard
        weatherDataLabel='Wind Speed'
        weatherData={currentData?.currWindInfo?.windSpeed}
      />
    </div>
  );
};

export default CurrWind;
