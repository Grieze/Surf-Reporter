import { useState, useEffect } from 'react';
import WeatherCard from '../weather-card/WeatherCard';

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
        weatherDataLabel={currentData?.[0].waveHeight.dataLabel}
        weatherData={currentData?.[0].waveHeight.data}
        extraData={currentData?.[0].waveHeight.unit}
        className={currentData?.[0].waveHeight.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].swellHeight.dataLabel}
        weatherData={currentData?.[0].swellHeight.data}
        extraData={currentData?.[0].swellHeight.unit}
        className={currentData?.[0].swellHeight.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].swellPeriod.dataLabel}
        weatherData={currentData?.[0].swellPeriod.data}
        extraData={currentData?.[0].swellPeriod.unit}
        className={currentData?.[0].swellPeriod.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].windWaveHeight.dataLabel}
        weatherData={currentData?.[0].windWaveHeight.data}
        extraData={currentData?.[0].windWaveHeight.unit}
        className={currentData?.[0].windWaveHeight.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].windWavePeriod.dataLabel}
        weatherData={currentData?.[0].windWavePeriod.data}
        extraData={currentData?.[0].windWavePeriod.unit}
        className={currentData?.[0].windWavePeriod.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].swellDirection.dataLabel}
        weatherData={currentData?.[0].swellDirection.data}
        extraData={currentData?.[0].swellDirection.unit}
        className={currentData?.[0].swellDirection.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].windWaveDirection.dataLabel}
        weatherData={currentData?.[0].windWaveDirection.data}
        extraData={currentData?.[0].windWaveDirection.unit}
        className={currentData?.[0].windWaveDirection.className}
      />
      <WeatherCard
        weatherDataLabel={currentData?.[0].steepness.dataLabel}
        weatherData={
          currentData?.[0].steepness.data === 'N/A' ? 'FLAT' : currentData?.[0].steepness.data
        }
        extraData={currentData?.[0].steepness.unit}
        className={currentData?.[0].steepness.className}
      />
    </div>
  );
};

export default CurrSwell;
