const WindDirectionCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div>
      <span>{weatherDataLabel}:</span>
      <span> {weatherData !== 'MM' ? weatherData : 'None'}</span>
    </div>
  );
};

export default WindDirectionCard;
