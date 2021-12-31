const WeatherCard = ({ className, weatherData, weatherDataLabel, extraData }) => {
  return (
    <div className={className}>
      <span>{weatherDataLabel}: </span>
      <span>
        {weatherData} {extraData}
      </span>
    </div>
  );
};

export default WeatherCard;
