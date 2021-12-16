const WindDirectionCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div>
      <span>{weatherDataLabel}: </span>
      <span>{weatherData} degrees</span>
    </div>
  );
};

export default WindDirectionCard;
