window.addEventListener('DOMContentLoaded', (event) => {
    let root = document.getElementById("root");
    let info = document.getElementById("info");
    let wind = document.getElementById("wind");
    let wave = document.getElementById("wave");
    
    // function returns a promise
    async function getData() {
        const response = await fetch('http://localhost:8000/reports');
        const data = await response.json();
        console.log('data', data) // data is a JSON object
        root.textContent = "CurrWindInfo: " + JSON.stringify(data.currWindInfo['windDirection']);
        let WVHT = document.createElement("div");
        WVHT.textContent = "Significant Wave Height: " + JSON.stringify(data.currSwellInfo["waveHeight"]);
        info.appendChild(WVHT);
        // inside function data is not a promise
        // we can do async stuff
        return data;
    }
    getData();
    console.log('DOM fully loaded and parsed', root);
});
