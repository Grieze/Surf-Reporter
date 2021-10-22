import { datascraper } from "./webscraper/dataScraperAPI.mjs"

const express = require('express');

const app = express();
const port = '8000';
const message = 'nice';
const webscraper = datascraper()

app.get('/', (req, res) => {
      // console.log('User made a get request to "/"', req);
      res.send(webscraper);
  })
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  })