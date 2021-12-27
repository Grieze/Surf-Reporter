import { useState, useEffect } from 'react';

import HeightCard from './weather-card/HeightCard';
import PeriodCard from './weather-card/PeriodCard';
import DirectionCard from './weather-card/DirectionCard';

const HistSwell = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/swell');
    const data = await response.json();
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const makeHistSwell = () => {
    const index = 32;
    const hourIndex = index - 1;
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
      let shift = i * 14;
      histData.push(
        <div key={i}>
          <div>
            <div>
              Time: {currentData?.[hourIndex + shift]}:{currentData?.[index + shift]}
            </div>
            <HeightCard
              weatherDataLabel='Wave Height'
              weatherData={currentData?.[waveHeightIndex + shift]}
            />
            <HeightCard
              weatherDataLabel='Swell Height'
              weatherData={currentData?.[swellHeightIndex + shift]}
            />
            <PeriodCard
              weatherDataLabel='Swell Period'
              weatherData={currentData?.[swellPeriodIndex + shift]}
            />
            <HeightCard
              weatherDataLabel='Wind Wave Height'
              weatherData={currentData?.[windWaveHeightIndex + shift]}
            />
            <PeriodCard
              weatherDataLabel='Wind Wave Period'
              weatherData={currentData?.[windWavePeriodIndex + shift]}
            />
            <DirectionCard
              weatherDataLabel={'Swell Direction'}
              weatherData={currentData?.[swellDirectionIndex + shift]}
            />
            <DirectionCard
              weatherDataLabel={'Wind Wave Direction'}
              weatherData={currentData?.[windWaveDirectionIndex + shift]}
            />
            <DirectionCard
              weatherDataLabel={'Steepness'}
              weatherData={currentData?.[steepnessIndex + shift]}
            />
          </div>
        </div>,
      );
    }
    return histData;
    // end makeHistSwell
  };
  return <div>{makeHistSwell()}</div>;
  //end HistSwell
};

export default HistSwell;
