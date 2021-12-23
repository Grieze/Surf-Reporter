const WindDirectionCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div className='wind-direction-card'>
      <div>{weatherDataLabel}: </div>
      <div>{weatherData !== 'MM' ? weatherData : 'None'}</div>
    </div>
  );
};

export default WindDirectionCard;
