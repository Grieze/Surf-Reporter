import { useState, useEffect } from 'react';

import WindDirectionCard from './weather-card/WindDirectionCard';
import WindSpeedCard from './weather-card/WindSpeedCard';

const HistWind = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const makeHistWind = () => {
    let index = currentData?.findIndex((val, i) => {
      if (val == '40') {
        return i;
      }
      i++;
    });

    const directionIndex = index + 1;
    const speedIndex = index + 2;
    const hourIndex = index - 1;
    const histData = [];

    for (let i = 0; i < 10; i++) {
      let shift = i * 108;
      histData.push(
        <div key={i}>
          <div>
            Time: {currentData?.[hourIndex + shift]}:{currentData?.[index + shift]}
          </div>
          <WindDirectionCard
            weatherDataLabel={'Wind Direction'}
            weatherData={currentData?.[directionIndex + shift]}
          />
          <WindSpeedCard
            weatherDataLabel={'Wind Speed'}
            weatherData={currentData?.[speedIndex + shift]}
          />
        </div>,
      );
    }
    return histData;
  };

  return <div>{makeHistWind()}</div>;
};

export default HistWind;
