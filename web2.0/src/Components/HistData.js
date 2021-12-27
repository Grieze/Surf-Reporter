import { useState, useEffect } from 'react';

import HeightCard from './weather-card/HeightCard';
import PeriodCard from './weather-card/PeriodCard';
import DirectionCard from './weather-card/DirectionCard';
import WindSpeedCard from './weather-card/WindSpeedCard';

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

  const degToCompass = (num) => {
    let val = Math.floor(Number(num) / 22.5 + 0.5);
    const arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return arr[val % 16];
  };

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

    for (let i = 0; i < 10; i++) {
      let windShift = i * 108;
      let swellShift = i * 14;
      histData.push(
        <div key={i} className='hist-data-container'>
          <div className='time'>
            {currentData?.windData[hourIndex + windShift]}:
            {currentData?.windData[windIndex + windShift]}
          </div>
          <DirectionCard
            weatherDataLabel={'Wind Direction'}
            weatherData={degToCompass(currentData?.windData[directionIndex + windShift])}
            className='direction-card'
          />
          <WindSpeedCard
            weatherDataLabel={'Wind Speed'}
            weatherData={currentData?.windData[speedIndex + windShift]}
            className='.wind-speed-card'
          />
          <HeightCard
            weatherDataLabel='Wave Height'
            weatherData={currentData?.swellData[waveHeightIndex + swellShift]}
            className='.height-card'
          />
          <HeightCard
            weatherDataLabel='Swell Height'
            weatherData={currentData?.swellData[swellHeightIndex + swellShift]}
            className='.height-card'
          />
          <PeriodCard
            weatherDataLabel='Swell Period'
            weatherData={currentData?.swellData[swellPeriodIndex + swellShift]}
          />
          <HeightCard
            weatherDataLabel='Wind Wave Height'
            weatherData={currentData?.swellData[windWaveHeightIndex + swellShift]}
            className='.height-card'
          />
          <PeriodCard
            weatherDataLabel='Wind Wave Period'
            weatherData={currentData?.swellData[windWavePeriodIndex + swellShift]}
            className='.period-card'
          />
          <DirectionCard
            weatherDataLabel={'Swell Direction'}
            weatherData={currentData?.swellData[swellDirectionIndex + swellShift]}
            className='direction-card'
          />
          <DirectionCard
            weatherDataLabel={'Wind Wave Direction'}
            weatherData={currentData?.swellData[windWaveDirectionIndex + swellShift]}
            className='direction-card'
          />
          <DirectionCard
            weatherDataLabel={'Steepness'}
            weatherData={currentData?.swellData[steepnessIndex + swellShift]}
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
