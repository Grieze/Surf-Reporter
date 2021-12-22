import { useState, useEffect } from 'react';

import WindDirectionCard from './weather-card/WindDirectionCard';
import WindSpeedCard from './weather-card/WindSpeedCard';

const CurrWind = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
    // console.log('data', data);
    setCurrentData(data);
  };

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <WindDirectionCard
        weatherDataLabel={'Wind Direction'}
        weatherData={degToCompass(currentData?.[41])}
      />
      <WindSpeedCard
        weatherDataLabel='Wind Speed'
        weatherData={Math.floor(currentData?.[42] / 0.44704)}
      />
    </div>
  );
};

export default CurrWind;
