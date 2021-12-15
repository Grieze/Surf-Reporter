window.addEventListener('DOMContentLoaded', (event) => {
  let currWind = document.getElementById('currWind');
  let currWave = document.getElementById('currWave');
  let histWind = document.getElementById('histWind');
  let histWave = document.getElementById('histWave');

  // function returns a promise
  async function getData() {
    const response = await fetch('http://localhost:8000/reports');
    const data = await response.json();
    console.log('data', data); // data is a JSON object

    // adding all of the data to the front end
    // Current Wind Data
    let windDirection = document.createElement('div');
    windDirection.textContent =
      'Wind Direction: ' + JSON.stringify(data.currWindInfo['windDirection']);
    let windSpeed = document.createElement('div');
    windSpeed.textContent = 'Wind Speed: ' + JSON.stringify(data.currWindInfo['windSpeed']);

    currWind.appendChild(windDirection);
    currWind.appendChild(windSpeed);

    // Current Wave Data
    let waveHeight = document.createElement('div');
    waveHeight.textContent =
      'Significant Wave Height: ' + JSON.stringify(data.currSwellInfo['waveHeight']);
    let swellHeight = document.createElement('div');
    swellHeight.textContent = 'Swell Height: ' + JSON.stringify(data.currSwellInfo['swellHeight']);
    let swellPeriod = document.createElement('div');
    swellPeriod.textContent = 'Swell Period: ' + JSON.stringify(data.currSwellInfo['swellPeriod']);
    let swellDirection = document.createElement('div');
    swellDirection.textContent =
      'Swell Direction: ' + JSON.stringify(data.currSwellInfo['swellDirection']);
    let windWaveHeight = document.createElement('div');
    windWaveHeight.textContent =
      'Wind Wave Height: ' + JSON.stringify(data.currSwellInfo['windWaveHeight']);
    let windWavePeriod = document.createElement('div');
    windWavePeriod.textContent =
      'Wind Wave Period: ' + JSON.stringify(data.currSwellInfo['windWavePeriod']);
    let windWaveDirection = document.createElement('div');
    windWaveDirection.textContent =
      'Wind Wave Direction: ' + JSON.stringify(data.currSwellInfo['windWaveDirection']);
    let averageWavePeriod = document.createElement('div');
    averageWavePeriod.textContent =
      'Average Wave Period: ' + JSON.stringify(data.currSwellInfo['averageWavePeriod']);

    // appending all the data
    currWave.appendChild(waveHeight);
    currWave.appendChild(swellHeight);
    currWave.appendChild(swellPeriod);
    currWave.appendChild(swellDirection);
    currWave.appendChild(windWaveHeight);
    currWave.appendChild(windWavePeriod);
    currWave.appendChild(windWaveDirection);
    currWave.appendChild(averageWavePeriod);

    // Hist Wind Data
    for (key in data.histWindInfo) {
      // console.log(data.histWindInfo[key]);
      let windDate = document.createElement('div');
      windDate.innerText =
        'Date: ' +
        JSON.stringify(data.histWindInfo[key]['month']) +
        '/' +
        JSON.stringify(data.histWindInfo[key]['day']);
      let windTime = document.createElement('div');
      windTime.innerText = 'Time: ' + JSON.stringify(data.histWindInfo[key]['time']);
      let histWindDirection = document.createElement('div');
      histWindDirection.innerText =
        'Wind Direction: ' + JSON.stringify(data.histWindInfo[key]['windDirection']);
      let histWindSpeed = document.createElement('div');
      histWindSpeed.textContent = 'Wind Speed: ' + JSON.stringify(data.currWindInfo['windSpeed']);

      histWind.appendChild(windDate);
      histWind.appendChild(windTime);
      histWind.appendChild(histWindDirection);
      histWind.appendChild(histWindSpeed);
    }

    // Hist Swell Data
    for (key in data.histSwellInfo) {
      let swellDate = document.createElement('div');
      swellDate.innerText =
        'Date: ' +
        JSON.stringify(data.histSwellInfo[key]['month']) +
        '/' +
        JSON.stringify(data.histSwellInfo[key]['day']);
      let swellTime = document.createElement('div');
      swellTime.innerText = 'Time: ' + JSON.stringify(data.histSwellInfo[key]['time']);
      let histWaveHeight = document.createElement('div');
      histWaveHeight.textContent =
        'Significant Wave Height: ' + JSON.stringify(data.histSwellInfo[key]['waveHeight']);
      let histSwellHeight = document.createElement('div');
      histSwellHeight.textContent =
        'Swell Height: ' + JSON.stringify(data.histSwellInfo[key]['swellHeight']);
      let histSwellPeriod = document.createElement('div');
      histSwellPeriod.textContent =
        'Swell Period: ' + JSON.stringify(data.histSwellInfo[key]['swellPeriod']);
      let histSwellDirection = document.createElement('div');
      histSwellDirection.textContent =
        'Swell Direction: ' + JSON.stringify(data.histSwellInfo[key]['swellDirection']);
      let histWindWaveHeight = document.createElement('div');
      histWindWaveHeight.textContent =
        'Wind Wave Height: ' + JSON.stringify(data.histSwellInfo[key]['windWaveHeight']);
      let histWindWavePeriod = document.createElement('div');
      histWindWavePeriod.textContent =
        'Wind Wave Period: ' + JSON.stringify(data.histSwellInfo[key]['windWavePeriod']);
      let histWindWaveDirection = document.createElement('div');
      histWindWaveDirection.textContent =
        'Wind Wave Direction: ' + JSON.stringify(data.histSwellInfo[key]['windWaveDirection']);
      let steepness = document.createElement('div');
      steepness.textContent = 'Steepness: ' + JSON.stringify(data.histSwellInfo[key]['steepness']);
      let histAverageWavePeriod = document.createElement('div');
      histAverageWavePeriod.textContent =
        'Average Wave Period: ' + JSON.stringify(data.histSwellInfo[key]['averageWavePeriod']);

      // appending all the data
      histWave.appendChild(swellDate);
      histWave.appendChild(swellTime);
      histWave.appendChild(histWaveHeight);
      histWave.appendChild(histSwellHeight);
      histWave.appendChild(histSwellPeriod);
      histWave.appendChild(histSwellDirection);
      histWave.appendChild(histWindWaveHeight);
      histWave.appendChild(histWindWavePeriod);
      histWave.appendChild(histWindWaveDirection);
      histWave.appendChild(steepness);
      histWave.appendChild(histAverageWavePeriod);
    }
    // inside function data is not a promise
    // we can do async stuff
    return data;
  }
  getData();
  console.log('DOM fully loaded and parsed', root);
});
