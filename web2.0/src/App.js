import CurrWind from './Components/CurrWind';
import CurrSwell from './Components/CurrSwell';
import HistWind from './Components/HistWind';
import HistSwell from './Components/HistSwell';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='page-header'>Welcome to Surf Reporter</h1>
        <div className='container'>
          <div className='current-info'>
            <div className='current-container'>
              <h3 className='current-header'>Current Rockaway Information</h3>
              <div className='current-info-box'>
                <CurrWind className='CurrWind' />
                <CurrSwell className='CurrSwell' />
              </div>
            </div>
          </div>
          {/* <div className='historic-info'>
            <h3>Historic Rockaway Information</h3>
            <h4>Data goes back 10 hours</h4>
            <HistWind className='HistWind' />
            <HistSwell className='HistSwell' />
          </div> */}
        </div>
      </header>
    </div>
  );
}

export default App;
