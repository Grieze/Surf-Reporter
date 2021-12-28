import { useState, useEffect } from 'react';

import HeightCard from './weather-card/HeightCard';
import PeriodCard from './weather-card/PeriodCard';
import DirectionCard from './weather-card/DirectionCard';

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
      <HeightCard weatherDataLabel='Wave Height' weatherData={currentData?.[33]} />
      <HeightCard weatherDataLabel='Swell Height' weatherData={currentData?.[34]} />
      <PeriodCard weatherDataLabel='Swell Period' weatherData={currentData?.[35]} />
      <HeightCard weatherDataLabel='Wind Wave Height' weatherData={currentData?.[36]} />
      <PeriodCard weatherDataLabel='Wind Wave Period' weatherData={currentData?.[37]} />
      <DirectionCard weatherDataLabel={'Swell Direction'} weatherData={currentData?.[38]} />
      <DirectionCard weatherDataLabel={'Wind Wave Direction'} weatherData={currentData?.[39]} />
      <DirectionCard weatherDataLabel={'Steepness'} weatherData={currentData?.[40]} />
    </div>
  );
};

export default CurrSwell;
