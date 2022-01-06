import { useState, useEffect } from 'react';
import WeatherCard from '../weather-card/WeatherCard';

const HistData = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const windResponse = await fetch('http://localhost:8000/wind');
    const windData = await windResponse.json();
    const swellResponse = await fetch('http://localhost:8000/swell');
    const swellData = await swellResponse.json();
    setCurrentData({ windData, swellData });
  };

  useEffect(() => {
    getData();
  }, []);

  const makeHistData = () => {
    const histData = [];

    for (let i = 0; i < currentData.windData.length; i++) {
      histData.push(
        <div key={i} className='hist-data-container'>
          <WeatherCard
            weatherDataLabel={currentData?.windData[i].time.dataLabel}
            weatherData={
              currentData?.windData[i].time.hour + ':' + currentData?.windData[i].time.min
            }
            extraData={currentData?.windData[i].time.unit}
            className={currentData?.windData[i].time.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.windData[i].windDirection.dataLabel}
            weatherData={currentData?.windData[i].windDirection.data}
            extraData={currentData?.windData[i].windDirection.unit}
            className={currentData?.windData[i].windDirection.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.windData[i].windSpeed.dataLabel}
            weatherData={currentData?.windData[i].windSpeed.data}
            extraData={currentData?.windData[i].windSpeed.unit}
            className={currentData?.windData[i].windSpeed.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].waveHeight.dataLabel}
            weatherData={currentData?.swellData[i].waveHeight.data}
            extraData={currentData?.swellData[i].waveHeight.unit}
            className={currentData?.swellData[i].waveHeight.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].swellHeight.dataLabel}
            weatherData={currentData?.swellData[i].swellHeight.data}
            extraData={currentData?.swellData[i].swellHeight.unit}
            className={currentData?.swellData[i].swellHeight.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].swellPeriod.dataLabel}
            weatherData={currentData?.swellData[i].swellPeriod.data}
            extraData={currentData?.swellData[i].swellPeriod.unit}
            className={currentData?.swellData[i].swellPeriod.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].windWaveHeight.dataLabel}
            weatherData={currentData?.swellData[i].windWaveHeight.data}
            extraData={currentData?.swellData[i].windWaveHeight.unit}
            className={currentData?.swellData[i].windWaveHeight.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].windWavePeriod.dataLabel}
            weatherData={currentData?.swellData[i].windWavePeriod.data}
            extraData={currentData?.swellData[i].windWavePeriod.unit}
            className={currentData?.swellData[i].windWavePeriod.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].swellDirection.dataLabel}
            weatherData={currentData?.swellData[i].swellDirection.data}
            extraData={currentData?.swellData[i].swellDirection.unit}
            className={currentData?.swellData[i].swellDirection.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].windWaveDirection.dataLabel}
            weatherData={currentData?.swellData[i].windWaveDirection.data}
            extraData={currentData?.swellData[i].windWaveDirection.unit}
            className={currentData?.swellData[i].windWaveDirection.className}
          />
          <WeatherCard
            weatherDataLabel={currentData?.swellData[i].steepness.dataLabel}
            weatherData={
              currentData?.swellData[i].steepness.data === 'N/A'
                ? 'FLAT'
                : currentData?.swellData[i].steepness.data
            }
            extraData={currentData?.swellData[i].steepness.unit}
            className={currentData?.swellData[i].steepness.className}
          />
        </div>,
      );
    }
    return histData;
    // end makeHistData
  };

  return <div className='historic-info-container'>{currentData && makeHistData()}</div>;
  //end HistData
};

export default HistData;
