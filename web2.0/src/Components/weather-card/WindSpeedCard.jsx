const WindSpeedCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div className='wind-speed-card'>
      <div>{weatherDataLabel}: </div>
      <div>{weatherData} mph</div>
    </div>
  );
};

export default WindSpeedCard;
