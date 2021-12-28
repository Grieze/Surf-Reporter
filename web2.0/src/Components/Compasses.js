import WindCompass from './WindCompass';
import SwellCompass from './SwellCompass';

const Compasses = () => {
  return (
    <div className='compasses'>
      <WindCompass dataLabel={'Wind Information'} />
      <SwellCompass dataLabel={'Swell Information'} />
    </div>
  );
};

export default Compasses;
