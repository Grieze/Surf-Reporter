import { useEffect } from "react"

const CurrWind = () => {
    const response = await fetch('http://localhost:8000/reports');
    const data = await response.json();

    console.log("CurrWind Works");
    const windDirection = "Wind Direction: ";
    const windSpeed = "Wind Speed: ";
    return (
        <div>
            <div>{windDirection}</div>
            <div>{windSpeed}</div>
        </div>
    );
};

export default CurrWind;