import CurrentData from './CurrentData';
import Compasses from './Compasses';

const CurrentInfo = () => {
  return (
    <div className='current-info'>
      <div className='current-container'>
        <h3 className='current-header'>Current Rockaway Information</h3>
        <CurrentData />
      </div>
      <Compasses />
    </div>
  );
};

export default CurrentInfo;
