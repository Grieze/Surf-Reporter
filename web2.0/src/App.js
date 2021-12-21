import CurrWind from './Components/CurrWind';
import CurrSwell from './Components/CurrSwell';
import HistWind from './Components/HistWind';
import HistSwell from './Components/HistSwell';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='page-header'>Welcome to Surf Reporter</h2>
        <h3 className='page-header'>It's a work in progress...</h3>
        <div className='container'>
          <div className='current-info'>
            <h3>Current Information</h3>
            <CurrWind className='CurrWind' />
            <CurrSwell className='CurrSwell' />
          </div>
          <div className='historic-info'>
            <HistWind className='HistWind' />
            <HistSwell className='HistSwell' />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
