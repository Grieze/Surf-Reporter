const { data } = require('cheerio/lib/api/attributes');
const express = require('express');

const app = express();
const port = '8000';
const message = 'Welcome to the beginning of the Surf Reporter API!';

app.get('/', (req, res) => {
      // console.log('User made a get request to "/"', req);
      console.log("Successfully made a get request!");
      res.send(message)
  })

app.get('/reports', (req, res) => {
  return res.send("WORK IN PROGRESS!");
})
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  })