const DirectionCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div className='direction-card'>
      <div>{weatherDataLabel}: </div>
      <div>{weatherData !== 'MM' ? weatherData : 'None'}</div>
    </div>
  );
};

export default DirectionCard;
