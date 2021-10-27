window.addEventListener('DOMContentLoaded', (event) => {
    let root = document.getElementById("root")

    // function returns a promise
    async function getData() {
        const response = await fetch('http://localhost:8000/reports');
        const data = await response.json();
        console.log('data', data)
        root.textContent = JSON.stringify(data.currWindInfo);
        // inside function data is not a promise
        // we can do async stuff
        return data;
    }
    getData();
    console.log('DOM fully loaded and parsed', root);
});
