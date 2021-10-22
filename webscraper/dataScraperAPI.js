function datascraper() {
  // objects to store the data in
  let currWindInfo = {};
  let histWindInfo = {};
  let currSwellInfo = {};
  let histSwellInfo = {};

  // import axios from "axios";
  // import cheerio from "cheerio";
  const axios = require("axios");
  const cheerio = require("cheerio")
  const url = 'https://www.ndbc.noaa.gov/station_page.php?station=44065';
  axios(url).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      // Scraping info for currWindInfo
      currWindInfo["Wind Direction"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)").text();
      currWindInfo["Wind Speed"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)").text();

      // Scraping info for currSwellInfo
      let currSwellTbodyLen = $("#data > table:nth-child(6) > tbody:nth-child(2)").children('tr').length;
      for (let i = 2; i < currSwellTbodyLen + 1; i++) {
        currSwellInfo[$("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text()] =
        $("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text();
      }

      // Scraping info for histWindInfo
      let histWindTbodyLen = $("table.dataTable:nth-child(4) > tbody:nth-child(2)").children('tr').length;
      for (let i = 3; i < histWindTbodyLen + 1; i++) {
        let month = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)").text() + "_";
        let day   = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text() + "_";
        let time  = $("table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text();
        histWindInfo[month + day + time] = {
          "Wind Direction" : $('table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(4)').text(),
          "Wind Speed"     : $('table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(5)').text(),
        }
      }

      // Scraping info for histSwellInfo
      let histSwellTbodyLen = $("table.dataTable:nth-child(7) > tbody:nth-child(2)").children('tr').length;
      for (let i = 3; i < histSwellTbodyLen + 1; i++) {
        let month = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)").text() + "_";
        let day   = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text() + "_";
        let time  = $("table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text();
        histSwellInfo[month + day + time] = {
            'Significant Wave Height (WVHT)' : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(4)').text(),
            'Swell Height (SwH)'             : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(5)').text(),
            'Swell Period (SwP)'             : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(6)').text(),
            'Swell Direction (SwD)'          : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(7)').text(),
            'Wind Wave Height (WWH)'         : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(8)').text(),
            'Wind Wave Period (WWP)'         : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(9)').text(),
            'Wind Wave Direction (WWD)'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(10)').text(),
            'Wave Steepness (STEEPNESS)'     : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(11)').text(),
            'Average Wave Period (APD)'      : $('table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' + i + ') > td:nth-child(12)').text(),
        }
      }
      const data = {... currWindInfo, currSwellInfo, histWindInfo, histSwellInfo};
      console.log(typeof data);
      return data;
    }).catch(console.error);
}

// Testing by invoking the function
datascraper();

  // convert JSON object to string
  // function convertor(filename, obj) {
  //   const data = JSON.stringify(obj);
  //   // write JSON string to a file
  //   let file = filename + '.json'
  //   fs.writeFile(file, data, (err) => {
  //       if (err) {throw err;}
  //       console.log(file + " was saved.");
  //   });
  // }