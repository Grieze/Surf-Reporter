const WindDirectionCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div>
      <span>{weatherDataLabel}: </span>
      <span>{weatherData !== 'MM' ? weatherData : 'None'} degrees</span>
    </div>
  );
};

export default WindDirectionCard;
