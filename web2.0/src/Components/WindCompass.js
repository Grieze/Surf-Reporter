import { useState, useEffect } from 'react';

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
              {currentData?.[0].windDirection.data}
              <span>
                {currentData?.[0].windSpeed.data} {currentData?.[0].windSpeed.unit}
              </span>
            </p>
          </div>
          <div className={`arrow ${currentData?.[0].windDirection.data}`}></div>
        </div>
      </div>
    </div>
  );
};

export default WindCompass;
