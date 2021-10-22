// import webscraper from "webscraper/dataScraperAPI.js"

// const express = require('express');
import express from "express";

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';
let currWindInfo =  {  
  'Wind Direction': '  W ( 270 deg true )',
  'Wind Speed': ' 11.7 kts',
}

let currSwellInfo = {
    'Significant Wave Height (WVHT):': '  4.3 ft',
    'Swell Height (SwH):': '  3.0 ft',
    'Swell Period (SwP):': '  7.1 sec ',
    'Swell Direction (SwD):': '  S',
    'Wind Wave Height (WWH):': '  3.3 ft',
    'Wind Wave Period (WWP):': '  6.2 sec ',
    'Wind Wave Direction (WWD):': '  S',
    'Wave Steepness (STEEPNESS):': '     STEEP',
    'Average Wave Period (APD):': '  5.1 sec'
  }

app.get('/', (req, res) => {
      // console.log('User made a get request to "/"', req);
      console.log("Successfully made a get request!");
      res.send(message)
  })

app.get('/reports', (req, res) => {
  return res.json({currWindInfo, currSwellInfo});
})
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  })