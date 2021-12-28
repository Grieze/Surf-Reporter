const axios = require('axios');
const express = require('express');
const cors = require('cors');
const scrape = require('./webscraper/dataScraperAPI');
const scrapeCurrWind = require('./webscraper/scrapeCurrWind');

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';
app.use(cors());

// HTTP Requests and Routes
app.get('/', (req, res) => {
  // console.log('User made a get request to "/"', req);
  console.log('Successfully made a get request!');
  res.send(message);
});

app.get('/wind', async (req, res) => {
  try {
    const response = await axios('https://www.ndbc.noaa.gov/data/realtime2/44065.txt');
    const data = await response.data;

    const table = data.split(' ').filter(function (entry) {
      return entry.trim() != '';
    });
    // console.log(`Wind Direction: ${table[41]}`);
    // console.log(`Wind Speed: ${table[42]}`);
    return res.send(table);
  } catch (error) {
    throw new Error(error);
    // res.send({ data: 'nope' }); // TODO: create a error response object
  }
});

app.get('/swell', async (req, res) => {
  try {
    const response = await axios('https://www.ndbc.noaa.gov/data/realtime2/44065.spec');
    const data = await response.data;

    const table = data.split(' ').filter(function (entry) {
      return entry.trim() != '';
    });

    return res.send(table);
  } catch (error) {
    throw new Error(error);
    // res.send({ data: 'nope' }); // TODO: create a error response object
  }
});

app.get('/reports', async (req, res) => {
  // Demo of how to incorporate business logic to an endpoint
  console.log('User just accessed index.html');
  const data = await scrape();
  return res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
