function scrapeCurrWind() {
  const axios = require('axios');
  const cheerio = require('cheerio');
  const url = 'https://www.ndbc.noaa.gov/station_page.php?station=44065';

  const currWindInfo = {};
  const response = axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      // Scraping info for currWindInfo
      currWindInfo['windDirection'] = $(
        '#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)',
      )
        .text()
        .trim();
      currWindInfo['windSpeed'] = $(
        '#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)',
      )
        .text()
        .trim();
      return currWindInfo;
    })
    .catch(console.error);
  return response;
}

module.exports = scrapeCurrWind;
