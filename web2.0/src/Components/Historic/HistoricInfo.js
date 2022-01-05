import HistData from '../Historic/HistData';

const HistoricInfo = () => {
  return (
    <div>
      <div className='historic-info-headings'>
        <h3>Historic Rockaway Information</h3>
      </div>
      <HistData className='hist-data' />
    </div>
  );
};

export default HistoricInfo;
