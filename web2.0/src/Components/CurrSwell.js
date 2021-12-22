import { useState, useEffect } from 'react';

const CurrSwell = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/swell');
    const data = await response.json();
    // console.log('data', data);
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  //   console.log('currentData', currentData);
  return (
    <div>
      <div>Wave Height: {(currentData?.[33] * 3.28084).toFixed(2)} feet</div>
      <div>Swell Height: {(currentData?.[34] * 3.28084).toFixed(2)} feet</div>
      <div>Swell Period: {currentData?.[35]} seconds</div>
      <div>Wind Wave Height: {(currentData?.[36] * 3.28084).toFixed(2)} feet</div>
      <div>Wind Wave Period: {currentData?.[37]} seconds</div>
      <div>Swell Direction: {currentData?.[38]}</div>
      <div>Wind Wave Direction: {currentData?.[39]}</div>
      <div>Steepness: {currentData?.[40]}</div>
    </div>
  );
};

export default CurrSwell;
