const WindSpeedCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div>
      <span>{weatherDataLabel}: </span>
      <span>{weatherData} mph</span>
    </div>
  );
};

export default WindSpeedCard;
