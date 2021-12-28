const PeriodCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div className='period-card'>
      <div>{weatherDataLabel}: </div>
      <div>{weatherData} secs</div>
    </div>
  );
};

export default PeriodCard;
