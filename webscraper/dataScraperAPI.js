function scrape() {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const url = 'https://www.ndbc.noaa.gov/station_page.php?station=44065';
    // https://www.ndbc.noaa.gov/data/realtime2/44065.txt

    // objects to store the data in
    let currWindInfo = {};
    let histWindInfo = {};
    let currSwellInfo = {};
    let histSwellInfo = {};

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

            // Scraping info for currSwellInfo
            currSwellInfo['waveHeight'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['swellHeight'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['swellPeriod'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['swellDirection'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['windWaveHeight'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(6) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['windWavePeriod'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(7) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['windWaveDirection'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(8) > td:nth-child(3)',
            )
                .text()
                .trim();
            currSwellInfo['averageWavePeriod'] = $(
                'table:nth-child(6) > tbody:nth-child(2) > tr:nth-child(9) > td:nth-child(3)',
            )
                .text()
                .trim();

            // Scraping info for histWindInfo
            let histWindTbodyLen = $('table.dataTable:nth-child(4) > tbody:nth-child(2)').children(
                'tr',
            ).length;
            let j = 0;
            let regex = new RegExp(':40');
            for (let i = 3; i < histWindTbodyLen + 1; i++) {
                // only interested in times with :40 to sync up with histSwellInfo
                if (
                    regex.test(
                        $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(3)',
                        )
                            .text()
                            .trim(),
                    )
                ) {
                    histWindInfo[j] = {
                        month: $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(1)',
                        )
                            .text()
                            .trim(),
                        day: $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(2)',
                        )
                            .text()
                            .trim(),
                        time: $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(3)',
                        )
                            .text()
                            .trim(),
                        windDirection: $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(4)',
                        )
                            .text()
                            .trim(),
                        windSpeed: $(
                            'table.dataTable:nth-child(4) > tbody:nth-child(2) > tr:nth-child(' +
                                i +
                                ') > td:nth-child(5)',
                        )
                            .text()
                            .trim(),
                    };
                    j++;
                }
                // do nothing
                else continue;
            }

            // Scraping info for histSwellInfo
            let histSwellTbodyLen = $('table.dataTable:nth-child(7) > tbody:nth-child(2)').children(
                'tr',
            ).length;
            for (let i = 3; i < histSwellTbodyLen + 1; i++) {
                histSwellInfo[i - 3] = {
                    month: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(1)',
                    )
                        .text()
                        .trim(),
                    day: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(2)',
                    )
                        .text()
                        .trim(),
                    time: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(3)',
                    )
                        .text()
                        .trim(),
                    waveHeight: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(4)',
                    )
                        .text()
                        .trim(),
                    swellHeight: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(5)',
                    )
                        .text()
                        .trim(),
                    swellPeriod: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(6)',
                    )
                        .text()
                        .trim(),
                    swellDirection: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(7)',
                    )
                        .text()
                        .trim(),
                    windWaveHeight: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(8)',
                    )
                        .text()
                        .trim(),
                    windWavePeriod: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(9)',
                    )
                        .text()
                        .trim(),
                    windWaveDirection: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(10)',
                    )
                        .text()
                        .trim(),
                    steepness: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(11)',
                    )
                        .text()
                        .trim(),
                    averageWavePeriod: $(
                        'table.dataTable:nth-child(7) > tbody:nth-child(2) > tr:nth-child(' +
                            i +
                            ') > td:nth-child(12)',
                    )
                        .text()
                        .trim(),
                };
            }
            return { currWindInfo, currSwellInfo, histWindInfo, histSwellInfo };
        })
        .catch(console.error);
    return response;
}

module.exports = scrape;
