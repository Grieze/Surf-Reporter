import { useState, useEffect } from 'react';

const WindCompass = ({ dataLabel }) => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
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

  //   console.log(`arrow ${degToCompass(currentData[41])}`);

  return (
    <div className='compass-container'>
      <div className='info-compass'>{dataLabel}</div>
      <div className='extra-circle'>
        <div className='compass'>
          <div className='direction'>
            <p>
              {degToCompass(currentData?.[41])}
              <span>{Math.floor(currentData?.[42] / 0.44704)} mph</span>
            </p>
          </div>
          <div className={`arrow ${degToCompass(currentData?.[41])}`}></div>
        </div>
      </div>
    </div>
  );
};

export default WindCompass;
