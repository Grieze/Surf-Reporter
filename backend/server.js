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
const WIND_DIR_COL = 5;
const WIND_SPEED_COL = 6;
const MAX_DATA_POINTS = 12;

const ROW_LIMIT = 12;
// Sync time is when wind data and swell data are lined up and synchronous
// 40 because wind is updated every 10 mins, swell is updated every hour
// at 40 they are in sync
const SYNC_TIME = '40';
// WIND and SWELL SKIP are how many positions we skip in order to get to the next necessary data
const SWELL_SKIP = 14;

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
    const windData = [];
    const matchedData = [];
    
    for (let i = 2; i < table.length; i++) {
      sortedData.push({
        year: table[i][YEAR_COL],
        month: table[i][MONTH_COL],
        day: table[i][DAY_COL],
        hour: table[i][HOUR_COL],
        minute: table[i][MINUTE_COL],
        windDirection: table[i][WIND_DIR_COL],
        windSpeed: table[i][WIND_SPEED_COL],
      })
    }
    
    let index = 0;
    let match = 0;
    while (match < MAX_DATA_POINTS) {
      if (sortedData[index].minute == SYNC_TIME) {
        matchedData.push(sortedData[index]);
        match++;
      }
      index++;
    }

    for (let i = 0; i < matchedData.length; i++) {
      windData.push({
        time: {
          hour: matchedData[i].hour,
          min: matchedData[i].minute,
          className: 'time',
          dataLabel: '',
          unit: '',
        },
        windDirection: {
          dataLabel: 'Wind Direction',
          data: degToCompass(matchedData[i].windDirection),
          unit: '',
          className: 'direction-card',
        },
        windSpeed: {
          dataLabel: 'Wind Speed',
          data: metersToMiles(matchedData[i].windSpeed),
          unit: 'mph',
          className: 'wind-speed-card',
        },
      })
    }

    return res.send(windData);
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/swell', async (req, res) => {
  try {
    const response = await axios(SWELL);
    const data = await response.data;

    const table = data.split(' ').filter(function (entry) {
      return entry.trim() != '';
    });

    // at index 32 in the array of data, that is the first row of data we want to start from
    const index = 32;
    const waveHeightIndex = index + 1;
    const swellHeightIndex = index + 2;
    const swellPeriodIndex = index + 3;
    const windWaveHeightIndex = index + 4;
    const windWavePeriodIndex = index + 5;
    const swellDirectionIndex = index + 6;
    const windWaveDirectionIndex = index + 7;
    const steepnessIndex = index + 8;
    const swellData = [];

    for (let i = 0; i < ROW_LIMIT; i++) {
      let swellShift = i * SWELL_SKIP;
      swellData.push({
        waveHeight: {
          dataLabel: 'Wave Height',
          data: table[waveHeightIndex + swellShift],
          unit: 'ft',
          className: 'height-card',
        },
        swellHeight: {
          dataLabel: 'Swell Height',
          data: table[swellHeightIndex + swellShift],
          unit: 'ft',
          className: 'height-card',
        },
        swellPeriod: {
          dataLabel: 'Swell Period',
          data: table[swellPeriodIndex + swellShift],
          unit: 'secs',
          className: 'period-card',
        },
        windWaveHeight: {
          dataLabel: 'Wind Wave Height',
          data: table[windWaveHeightIndex + swellShift],
          unit: 'ft',
          className: 'height-card',
        },
        windWavePeriod: {
          dataLabel: 'Wind Wave Period',
          data: table[windWavePeriodIndex + swellShift],
          unit: 'secs',
          className: 'period-card',
        },
        swellDirection: {
          dataLabel: 'Swell Direction',
          data: table[swellDirectionIndex + swellShift],
          unit: '',
          className: 'direction-card',
        },
        windWaveDirection: {
          dataLabel: 'Wind Wave Direction',
          data: table[windWaveDirectionIndex + swellShift],
          unit: '',
          className: 'direction-card',
        },
        steepness: {
          dataLabel: 'Steepness',
          data: table[steepnessIndex + swellShift],
          unit: '',
          className: 'direction-card',
        },
      });
      // end for loop
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
