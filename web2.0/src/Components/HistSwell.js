import { useState, useEffect } from 'react';

const HistSwell = () => {
  const [currentData, setCurrentData] = useState();

  const getData = async () => {
    const response = await fetch('http://localhost:8000/swell');
    const data = await response.json();
    setCurrentData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const makeHistSwell = () => {
    const index = 32;
    const directionIndex = index + 1;
    const speedIndex = index + 2;
    const hourIndex = index - 1;
    const histData = [];

    for (let i = 0; i < 10; i++) {
      let shift = i * 108;
      histData.push(
        <div key={i}>
          <div>
            <div>
              {currentData?.[hourIndex + shift]}:{currentData?.[index + shift]}
            </div>
            <div>Wave Height: {currentData?.[i]} meters</div>
            <div>Swell Height: {currentData?.[i]} meters</div>
            <div>Swell Period: {currentData?.[i]} seconds</div>
            <div>Wind Wave Height: {currentData?.[i]} meters</div>
            <div>Wind Wave Period: {currentData?.[i]} seconds</div>
            <div>Swell Direction: {currentData?.[i]}</div>
            <div>Wind Wave Direction: {currentData?.[i]}</div>
            <div>Steepness: {currentData?.[i]}</div>
          </div>
        </div>,
      );
    }
    // end makeHistSwell
  };
  makeHistSwell();
  return <div>HistSwell</div>;
  //end HistSwell
};

export default HistSwell;
