const WeatherCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div>
      <span>{weatherDataLabel}: </span>
      <span>{weatherData} </span>
    </div>
  );
};

export default WeatherCard;
