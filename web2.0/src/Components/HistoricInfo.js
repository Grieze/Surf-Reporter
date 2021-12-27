import HistData from './HistData';

const HistoricInfo = () => {
  return (
    <div>
      <h3>Historic Rockaway Information</h3>
      <h4>Data goes back 10 hours</h4>
      <HistData className='hist-data' />
    </div>
  );
};

export default HistoricInfo;
