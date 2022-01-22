import { useState, useEffect } from 'react';
import WeatherCard from '../weather-card/WeatherCard';

const CurrWind = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <WeatherCard
        weatherDataLabel={currentData?.[0].windDirection.dataLabel}
        weatherData={currentData?.[0].windDirection.data}
        extraData={currentData?.[0].windDirection.unit}
        className={currentData?.[0].windDirection.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].windSpeed.dataLabel}
        weatherData={currentData?.[0].windSpeed.data}
        extraData={currentData?.[0].windSpeed.unit}
        className={currentData?.[0].windSpeed.className}
      />
    </div>
  );
};

export default CurrWind;
