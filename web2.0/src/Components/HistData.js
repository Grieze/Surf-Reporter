import { useState, useEffect } from 'react';
import WeatherCard from './weather-card/WeatherCard';
import degToCompass from '../utils';

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
    let windIndex = currentData?.windData.findIndex((val, i) => {
      if (val == '40') {
        return i;
      }
      i++;
    });

    const directionIndex = windIndex + 1;
    const speedIndex = windIndex + 2;
    const hourIndex = windIndex - 1;
    const index = 32;
    const waveHeightIndex = index + 1;
    const swellHeightIndex = index + 2;
    const swellPeriodIndex = index + 3;
    const windWaveHeightIndex = index + 4;
    const windWavePeriodIndex = index + 5;
    const swellDirectionIndex = index + 6;
    const windWaveDirectionIndex = index + 7;
    const steepnessIndex = index + 8;
    const histData = [];

    for (let i = 0; i < 12; i++) {
      let windShift = i * 108;
      let swellShift = i * 14;
      histData.push(
        <div key={i} className='hist-data-container'>
          <div className='time'>
            {currentData?.windData[hourIndex + windShift]}:
            {currentData?.windData[windIndex + windShift]}
          </div>
          <WeatherCard
            weatherDataLabel={'Wind Direction'}
            weatherData={degToCompass(currentData?.windData[directionIndex + windShift])}
            extraData={''}
            className='direction-card'
          />
          <WeatherCard
            weatherDataLabel={'Wind Speed'}
            weatherData={currentData?.windData[speedIndex + windShift]}
            extraData={'mph'}
            className='wind-speed-card'
          />
          <WeatherCard
            weatherDataLabel='Wave Height'
            weatherData={currentData?.swellData[waveHeightIndex + swellShift]}
            extraData={'ft'}
            className='height-card'
          />
          <WeatherCard
            weatherDataLabel='Swell Height'
            weatherData={currentData?.swellData[swellHeightIndex + swellShift]}
            extraData={'ft'}
            className='height-card'
          />
          <WeatherCard
            weatherDataLabel='Swell Period'
            weatherData={currentData?.swellData[swellPeriodIndex + swellShift]}
            extraData={'secs'}
            className={'period-card'}
          />
          <WeatherCard
            weatherDataLabel='Wind Wave Height'
            weatherData={currentData?.swellData[windWaveHeightIndex + swellShift]}
            extraData={'ft'}
            className='height-card'
          />
          <WeatherCard
            weatherDataLabel='Wind Wave Period'
            weatherData={currentData?.swellData[windWavePeriodIndex + swellShift]}
            extraData={'secs'}
            className='period-card'
          />
          <WeatherCard
            weatherDataLabel={'Swell Direction'}
            weatherData={currentData?.swellData[swellDirectionIndex + swellShift]}
            extraData={''}
            className='direction-card'
          />
          <WeatherCard
            weatherDataLabel={'Wind Wave Direction'}
            weatherData={currentData?.swellData[windWaveDirectionIndex + swellShift]}
            extraData={''}
            className='direction-card'
          />
          <WeatherCard
            weatherDataLabel={'Steepness'}
            weatherData={
              currentData?.swellData[steepnessIndex + swellShift] === 'N/A'
                ? 'FLAT'
                : currentData?.swellData[steepnessIndex + swellShift]
            }
            extraData={''}
            className='direction-card'
          />
        </div>,
      );
    }
    return histData;
    // end makeHistData
  };

  return <div className='historic-info-container'>{makeHistData()}</div>;
  //end HistData
};

export default HistData;
