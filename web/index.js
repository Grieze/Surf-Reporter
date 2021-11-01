window.addEventListener('DOMContentLoaded', (event) => {
    let currWind = document.getElementById("currWind");
    let currWave = document.getElementById("currWave");
    let histWind = document.getElementById("histWind");
    let histWave = document.getElementById("histWave");
    
    // function returns a promise
    async function getData() {
        const response = await fetch('http://localhost:8000/reports');
        const data = await response.json();
        console.log('data', data) // data is a JSON object

        // adding all of the data to the front end

        // Current Wind Data
        let windDirection = document.createElement("div");
        windDirection.textContent = "Wind Direction: " + JSON.stringify(data.currWindInfo["windDirection"]);
        let windSpeed = document.createElement("div");
        windSpeed.textContent = "Wind Speed: " + JSON.stringify(data.currWindInfo["windSpeed"]);

        currWind.appendChild(windDirection);
        currWind.appendChild(windSpeed);
        
        // Current Wave Data
        let waveHeight = document.createElement("div");
        waveHeight.textContent = "Significant Wave Height: " + JSON.stringify(data.currSwellInfo["waveHeight"]);
        let swellHeight = document.createElement("div");
        swellHeight.textContent = "Swell Height: " + JSON.stringify(data.currSwellInfo["swellHeight"]);
        let swellPeriod = document.createElement("div");
        swellPeriod.textContent = "Swell Period: " + JSON.stringify(data.currSwellInfo["swellPeriod"]);
        let swellDirection = document.createElement("div");
        swellDirection.textContent = "Swell Direction: " + JSON.stringify(data.currSwellInfo["swellDirection"]);
        let windWaveHeight = document.createElement("div");
        windWaveHeight.textContent = "Wind Wave Height: " + JSON.stringify(data.currSwellInfo["windWaveHeight"]);
        let windWavePeriod = document.createElement("div");
        windWavePeriod.textContent = "Wind Wave Period: " + JSON.stringify(data.currSwellInfo["windWavePeriod"]);
        let windWaveDirection = document.createElement("div");
        windWaveDirection.textContent = "Wind Wave Direction: " + JSON.stringify(data.currSwellInfo["windWaveDirection"]);
        let steepness = document.createElement("div");
        steepness.textContent = "Steepness: " + JSON.stringify(data.currSwellInfo["steepness"]);
        let averageWavePeriod = document.createElement("div");
        averageWavePeriod.textContent = "Average Wave Period: " + JSON.stringify(data.currSwellInfo["averageWavePeriod"]);
        
        // appending all the data
        currWave.appendChild(waveHeight);
        currWave.appendChild(swellHeight);
        currWave.appendChild(swellPeriod);
        currWave.appendChild(swellDirection);
        currWave.appendChild(windWaveHeight);
        currWave.appendChild(windWavePeriod);
        currWave.appendChild(windWaveDirection);
        currWave.appendChild(steepness);
        currWave.appendChild(averageWavePeriod);

        // inside function data is not a promise
        // we can do async stuff
        return data;
    }
    getData();
    console.log('DOM fully loaded and parsed', root);
});
