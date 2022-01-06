import axios from 'axios';
import express from 'express';
import cors from 'cors';
import degToCompass from './utils.js';

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';

const WIND = 'https://www.ndbc.noaa.gov/data/realtime2/44065.txt';
const SWELL = 'https://www.ndbc.noaa.gov/data/realtime2/44065.spec';
const ROW_LIMIT = 12;

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

    const table = data.split(' ').filter(function (entry) {
      return entry.trim() != '';
    });

    const windData = [];

    let windIndex = table.findIndex((val, i) => {
      if (val == '40') {
        return i;
      }
      i++;
    });

    const directionIndex = windIndex + 1;
    const speedIndex = windIndex + 2;
    const hourIndex = windIndex - 1;

    for (let i = 0; i < ROW_LIMIT; i++) {
      let shift = i * 108;
      windData.push({
        time: {
          hour: table[hourIndex + shift],
          min: table[windIndex + shift],
          className: 'time',
          dataLabel: '',
          unit: '',
        },
        windDirection: {
          dataLabel: 'Wind Direction',
          data: degToCompass(table[directionIndex + shift]),
          unit: '',
          className: 'direction-card',
        },
        windSpeed: {
          dataLabel: 'Wind Speed',
          data: Math.floor(table[speedIndex + shift] / 0.44704),
          unit: 'mph',
          className: 'wind-speed-card',
        },
      });
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
      let swellShift = i * 14;
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
