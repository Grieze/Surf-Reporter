import axios from 'axios';
import express from 'express';
import cors from 'cors';
import degToCompass from './utils.js';

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';

const WIND = 'https://www.ndbc.noaa.gov/data/realtime2/44065.txt';
const SWELL = 'https://www.ndbc.noaa.gov/data/realtime2/44065.spec';

const YEAR_COL = 0;
const MONTH_COL = 1;
const DAY_COL = 2;
const HOUR_COL = 3;
const MINUTE_COL = 4;
const WIND_DIRECTION_COL = 5;
const WIND_SPEED_COL = 6;

const WAVE_HEIGHT_COL = 5;
const SWELL_HEIGHT_COL = 6;
const SWELL_PERIOD_COL = 7;
const WIND_WAVE_HEIGHT_COL = 8;
const WIND_WAVE_PERIOD_COL = 9;
const SWELL_DIRECTION_COL = 10;
const WIND_WAVE_DIRECTION_COL = 11;
const STEEPNESS_COL = 12;

const MAX_DATA_POINTS = 12;

// Sync time is when wind and swell data are lined up and synchronous
// 40 because wind is updated every 10 mins, swell is updated every hour at 40
const SYNC_TIME = '40';

app.use(cors());

// HTTP Requests and Routes
app.get('/', (req, res) => {
  console.log('Successfully made a get request!');
  res.send(message);
});

app.get('/wind', async (req, res) => {
  try {
    const response = await axios(WIND);
    const data = await response.data;

    const table = data.split('\n');
    table.forEach((item, index, array) => {
      let row = item.split(' ').filter((val) => {
        return val.trim() != '';
      });
      array[index] = row;
    })
    
    const sortedData = [];
    const matchedData = [];
    const windData = [];

   
    for (let i = 2; i < table.length; i++) {
      let tempObj = {};
      for (let j = 0; j < table[0].length; j++) {
        tempObj[`${table[0][j]}`] = table[i][j];
      }
      sortedData.push(tempObj);
    }
    

    sortedData.forEach((val,i) => {
      if (sortedData[i]['mm'] == SYNC_TIME)
        matchedData.push(sortedData[i]);
    })

    for (let i = 0; i < MAX_DATA_POINTS; i++) {
      windData.push({
        time: {
          hour: matchedData[i]['hh'],
          min: matchedData[i]['mm'],
          className: 'time',
          dataLabel: '',
          unit: '',
        },
        windDirection: {
          dataLabel: 'Wind Direction',
          data: degToCompass(matchedData[i]['WDIR']),
          unit: '',
          className: 'direction-card',
        },
        windSpeed: {
          dataLabel: 'Wind Speed',
          data: metersToMiles(matchedData[i]['WSPD']),
          unit: 'mph',
          className: 'wind-speed-card',
        },
      })
    };
    
    return res.send(windData);
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/swell', async (req, res) => {
  try {
    const response = await axios(SWELL);
    const data = await response.data;

    const test = data.split('\n');
    test.forEach((item, index, array) => {
      let row = item.split(' ').filter((val) => {
        return val.trim() != '';
      });
      array[index] = row;
    })

    const storedData = [];
    const swellData = [];

    for (let i = 2; i < test.length; i++) {
      storedData.push({
        waveHeight: test[i][WAVE_HEIGHT_COL],
        swellHeight: test[i][SWELL_HEIGHT_COL],
        swellPeriod: test[i][SWELL_PERIOD_COL],
        windWaveHeight: test[i][WIND_WAVE_HEIGHT_COL],
        windWavePeriod: test[i][WIND_WAVE_PERIOD_COL],
        swellDirection: test[i][SWELL_DIRECTION_COL],
        windWaveDirection: test[i][WIND_WAVE_DIRECTION_COL],
        steepness: test[i][STEEPNESS_COL]
      })
    }

    for (let i = 0; i < MAX_DATA_POINTS; i++) {
      swellData.push({
        waveHeight: {
          dataLabel: 'Wave Height',
          data: storedData[i].waveHeight,
          unit: 'ft',
          className: 'height-card',
        },
        swellHeight: {
          dataLabel: 'Swell Height',
          data: storedData[i].swellHeight,
          unit: 'ft',
          className: 'height-card',
        },
        swellPeriod: {
          dataLabel: 'Swell Period',
          data: storedData[i].swellPeriod,
          unit: 'secs',
          className: 'period-card',
        },
        windWaveHeight: {
          dataLabel: 'Wind Wave Height',
          data: storedData[i].windWaveHeight,
          unit: 'ft',
          className: 'height-card',
        },
        windWavePeriod: {
          dataLabel: 'Wind Wave Period',
          data: storedData[i].windWavePeriod,
          unit: 'secs',
          className: 'period-card',
        },
        swellDirection: {
          dataLabel: 'Swell Direction',
          data: storedData[i].swellDirection,
          unit: '',
          className: 'direction-card',
        },
        windWaveDirection: {
          dataLabel: 'Wind Wave Direction',
          data: storedData[i].windWaveDirection,
          unit: '',
          className: 'direction-card',
        },
        steepness: {
          dataLabel: 'Steepness',
          data: storedData[i].steepness,
          unit: '',
          className: 'direction-card',
        },
      })
    }

    res.send(swellData);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`Backend is listening on http://localhost:${port}`);
});

const metersToMiles = (val) => {
  return Math.floor(val / 0.44704);
};
