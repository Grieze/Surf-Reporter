const axios = require("axios");
const cheerio = require("cheerio")
const fs = require('fs');
const url = 'https://www.ndbc.noaa.gov/station_page.php?station=44065';

// objects to store the data in
let currWindInfo = {};
let histWindInfor = {};
let currSwellInfo = {};
let histSwellInfo = {};

axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    // pull the two data points for currWindInfo
    currWindInfo["Wind Direction"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)").text();
    currWindInfo["Wind Speed"] = $("#data > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)").text();
    // Scraping info for currSwellInfo
    for (let i = 2; i < 11; i++) {
      currSwellInfo[$("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(2)").text()] =
      $("table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(3)").text();
    }
    console.log(currSwellInfo);
  }).catch(console.error);


  // const swellDataTable = $('.dataTable');
  // fs.writeFile('swellDataTable.html', swellDataTable.toString(), function(err) {
  //   if (err)
  //     return console.log(err);
  //   console.log(true)})
  // const significantSwellData = $('#data > table:nth-child(6)');
  // fs.writeFile('significantSwellData.html', significantSwellData.toString(), function(err){
  //   if (err)
  //     return console.log(err);
  //   console.log(true);
  // })
  // let test = $("#data > table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)");
  // console.log(test.text())
