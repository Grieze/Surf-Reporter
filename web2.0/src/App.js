import CurrWind from './Components/CurrWind';
import CurrSwell from './Components/CurrSwell';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Welcome to Surf Reporter</h2>
        <h3>It's a work in progress...</h3>
        <CurrWind />
        <CurrSwell />
      </header>
    </div>
  );
}

export default App;
