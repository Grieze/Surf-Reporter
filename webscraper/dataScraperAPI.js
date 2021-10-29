function scrape() {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const url = 'https://www.ndbc.noaa.gov/station_page.php?station=44065';
  // https://www.ndbc.noaa.gov/data/realtime2/44065.txt

  // objects to store the data in
  let currWindInfo = {};
  let histWindInfo = {};
  let currSwellInfo = {};
  let histSwellInfo = {};

  const response = axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    // Scraping info for currWindInfo
    currWindInfo["windDirection"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)").text().trim();
    currWindInfo["windSpeed"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)").text().trim();

    // Scraping info for currSwellInfo
    currSwellInfo['waveHeight']      = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)').text().trim();
    currSwellInfo['SwH']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)').text().trim();
    currSwellInfo['SwP']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(3)').text().trim();
    currSwellInfo['SwD']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(3)').text().trim();
    currSwellInfo['WWH']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(6) > td:nth-child(3)').text().trim();
    currSwellInfo['WWP']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(7) > td:nth-child(3)').text().trim();
    currSwellInfo['WWD']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(8) > td:nth-child(3)').text().trim();
    currSwellInfo['STEEPNESS'] = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(9) > td:nth-child(3)').text().trim();
    currSwellInfo['APD']       = $('table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(10) > td:nth-child(3)').text().trim();

    // let currSwellTbodyLen = $("#data > table:nth-child(6) > tbody:nth-child(2)").children('tr').length;
    // for (let i = 2; i < currSwellTbodyLen + 1; i++) {
    //   currSwellInfo[$("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text()] =
    //   $("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text().trim();
    // }

    // Scraping info for histWindInfo
    let histWindTbodyLen = $("table.dataTable:nth-child(4) > tbody:nth-child(2)").children('tr').length;
    for (let i = 3; i < histWindTbodyLen + 1; i++) {
      let month = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)").text() + "_";
      let day   = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text() + "_";
      let time  = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text();
      histWindInfo[month + day + time] = {
        "Wind Direction" : $('table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(4)').text().trim(),
        "Wind Speed"     : $('table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(5)').text().trim(),
        }
      }

      // Scraping info for histSwellInfo
      let histSwellTbodyLen = $("table.dataTable:nth-child(7) > tbody:nth-child(2)").children('tr').length;
      for (let i = 3; i < histSwellTbodyLen + 1; i++) {
        let month = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)").text() + "_";
        let day   = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text() + "_";
        let time  = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text().trim();
        histSwellInfo[month + day + time] = {
            'WVHT'     : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(4)').text().trim(),
            'SwH'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(5)').text().trim(),
            'SwP'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(6)').text().trim(),
            'SwD'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(7)').text().trim(),
            'WWH'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(8)').text().trim(),
            'WWP'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(9)').text().trim(),
            'WWD'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(10)').text().trim(),
            'STEEPNESS': $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(11)').text().trim(),
            'APD'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(12)').text().trim(),
        }
      }
      return { currWindInfo, currSwellInfo, histWindInfo, histSwellInfo };
  })
  .catch(console.error);
  return response;
}

module.exports = scrape;
// scrape();
// console.log(info);

// AsyncCall().then(res=>res.json()).then(data => doSomethingWithDataHere_itsnotaproniseanymorehere)
