import { useState, useEffect } from 'react';

import degToCompass from '../utils';

const WindCompass = ({ dataLabel }) => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/wind');
    const data = await response.json();
    setCurrentData(data);
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
