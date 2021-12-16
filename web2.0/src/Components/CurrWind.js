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

  useEffect(() => {
    getData();
  }, []);
  // console.log('currentData', currentData);
  return (
    <div>
      {/* <button onClick={testEndpoint}>WAT</button> */}
      <WindDirectionCard weatherDataLabel={'Wind Direction'} weatherData={currentData?.[41]} />
      <WindSpeedCard
        weatherDataLabel='Wind Speed'
        weatherData={Math.floor(currentData?.[42] / 0.44704)}
      />
    </div>
  );
};

export default CurrWind;
