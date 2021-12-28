const HeightCard = ({ weatherData, weatherDataLabel }) => {
  return (
    <div className='height-card'>
      <div>{weatherDataLabel}: </div>
      <div>{(weatherData * 3.28084).toFixed(2)} ft</div>
    </div>
  );
};

export default HeightCard;
