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
              {currentData?.[0].swellDirection.data}
              <span>{currentData?.[0].swellHeight.data} ft</span>
            </p>
          </div>
          <div className={`arrow ${currentData?.[0].swellDirection.data}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SwellCompass;
