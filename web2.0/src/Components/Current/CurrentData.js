import CurrWind from './CurrWind';
import CurrSwell from './CurrSwell';

const CurrentData = () => {
  return (
    <div className='current-info-box'>
      <CurrWind className='CurrWind' />
      <CurrSwell className='CurrSwell' />
    </div>
  );
};

export default CurrentData;
