const express = require('express');

const scrape = require('./webscraper/dataScraperAPI');

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';

app.get('/', (req, res) => {
      // console.log('User made a get request to "/"', req);
      console.log("Successfully made a get request!");
      res.send(message)
  })

app.get('/reports', async (req, res) => {
    // Demo of how to incorporate business logic to an endpoint
    const data = await scrape();
    return res.send(data);
})
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  })
