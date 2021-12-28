import { useState, useEffect } from 'react';

const SwellCompass = ({ dataLabel }) => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/swell');
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
              {currentData?.[38]}
              <span>{(currentData?.[34] * 3.28084).toFixed(2)} ft</span>
            </p>
          </div>
          <div className={`arrow ${currentData?.[38]}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SwellCompass;
