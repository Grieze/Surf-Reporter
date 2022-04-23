import axios from 'axios';
import express from 'express';
import cors from 'cors';
import degToCompass from './utils.js';

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';

const WIND = 'https://www.ndbc.noaa.gov/data/realtime2/44065.txt';
const SWELL = 'https://www.ndbc.noaa.gov/data/realtime2/44065.spec';

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

    // take data and split it into a 2d table called table
    const table = data.split('\n');
    table.forEach((item, index, array) => {
      let row = item.split(' ').filter((val) => {
        return val.trim() != '';
      });
      array[index] = row;
    })

    const windTableObjectData = [];
    const windData = [];

    for (let i = 2; i < table.length; i++) {
      let tempObj = {};
      for (let j = 0; j < table[0].length; j++) {
        tempObj[`${table[0][j]}`] = table[i][j];
      }
      windTableObjectData.push(tempObj);
    }

    let filteredWindData = windTableObjectData.filter((obj) => {
      return obj['mm'] == SYNC_TIME;
    })

    console.log(filteredWindData.slice(0,10));

    for (let i = 0; i < MAX_DATA_POINTS; i++) {
      windData.push({
        time: {
          hour: filteredWindData[i]['hh'],
          min: filteredWindData[i]['mm'],
          className: 'time',
          dataLabel: '',
          unit: '',
        },
        windDirection: {
          dataLabel: 'Wind Direction',
          data: degToCompass(filteredWindData[i]['WDIR']),
          unit: '',
          className: 'direction-card',
        },
        windSpeed: {
          dataLabel: 'Wind Speed',
          data: metersToMiles(filteredWindData[i]['WSPD']),
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

    // take data and split it into a 2d table called table
    const table = data.split('\n');
    table.forEach((item, index, array) => {
      let row = item.split(' ').filter((val) => {
        return val.trim() != '';
      });
      array[index] = row;
    })

    const swellTableObjectData = [];
    const swellData = [];

    for (let i = 2; i < table.length; i++) {
      let tempObj = {};
      for (let j = 0; j < table[0].length; j++) {
        tempObj[`${table[0][j]}`] = table[i][j];
      }
      swellTableObjectData.push(tempObj);
    }

    for (let i = 0; i < MAX_DATA_POINTS; i++) {
      swellData.push({
        waveHeight: {
          dataLabel: 'Wave Height',
          data: swellTableObjectData[i]['WVHT'],
          unit: 'ft',
          className: 'height-card',
        },
        swellHeight: {
          dataLabel: 'Swell Height',
          data: swellTableObjectData[i]['SwH'],
          unit: 'ft',
          className: 'height-card',
        },
        swellPeriod: {
          dataLabel: 'Swell Period',
          data: swellTableObjectData[i]['SwP'],
          unit: 'secs',
          className: 'period-card',
        },
        windWaveHeight: {
          dataLabel: 'Wind Wave Height',
          data: swellTableObjectData[i]['WWH'],
          unit: 'ft',
          className: 'height-card',
        },
        windWavePeriod: {
          dataLabel: 'Wind Wave Period',
          data: swellTableObjectData[i]['WWP'],
          unit: 'secs',
          className: 'period-card',
        },
        swellDirection: {
          dataLabel: 'Swell Direction',
          data: swellTableObjectData[i]['SwD'],
          unit: '',
          className: 'direction-card',
        },
        windWaveDirection: {
          dataLabel: 'Wind Wave Direction',
          data: swellTableObjectData[i]['WWD'],
          unit: '',
          className: 'direction-card',
        },
        steepness: {
          dataLabel: 'Steepness',
          data: swellTableObjectData[i]['STEEPNESS'],
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
