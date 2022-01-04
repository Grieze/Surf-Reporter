const WeatherCard = ({ className, weatherData, weatherDataLabel, extraData }) => {
  return (
    <div className={className}>
      <div>{weatherDataLabel}</div>
      <div>
        {weatherData} {extraData}
      </div>
    </div>
  );
};

export default WeatherCard;
