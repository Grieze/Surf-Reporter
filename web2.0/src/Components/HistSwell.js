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
    const hourIndex = index - 1;
    const waveHeightIndex = index + 1;
    const swellHeightIndex = index + 2;
    const swellPeriodIndex = index + 3;
    const windWaveHeightIndex = index + 4;
    const windWavePeriodIndex = index + 5;
    const swellDirectionIndex = index + 6;
    const windWaveDirectionIndex = index + 7;
    const steepnessIndex = index + 8;
    const histData = [];

    for (let i = 0; i < 10; i++) {
      let shift = i * 14;
      histData.push(
        <div key={i}>
          <div>
            <div>
              Time: {currentData?.[hourIndex + shift]}:{currentData?.[index + shift]}
            </div>
            <div>
              Wave Height: {(currentData?.[waveHeightIndex + shift] * 3.28084).toFixed(2)} feet
            </div>
            <div>
              Swell Height: {(currentData?.[swellHeightIndex + shift] * 3.28084).toFixed(2)} meters
            </div>
            <div>Swell Period: {currentData?.[swellPeriodIndex + shift]} seconds</div>
            <div>
              Wind Wave Height: {(currentData?.[windWaveHeightIndex + shift] * 3.28084).toFixed(2)}
              feet
            </div>
            <div>Wind Wave Period: {currentData?.[windWavePeriodIndex + shift]} seconds</div>
            <div>Swell Direction: {currentData?.[swellDirectionIndex + shift]}</div>
            <div>Wind Wave Direction: {currentData?.[windWaveDirectionIndex + shift]}</div>
            <div>Steepness: {currentData?.[steepnessIndex + shift]}</div>
          </div>
        </div>,
      );
    }
    return histData;
    // end makeHistSwell
  };
  return <div>{makeHistSwell()}</div>;
  //end HistSwell
};

export default HistSwell;
