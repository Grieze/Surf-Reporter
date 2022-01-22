import CurrentInfo from './Components/Current/CurrentInfo';
import HistoricInfo from './Components/Historic/HistoricInfo';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='page-header'>Welcome to Surf Reporter</h1>
        <div className='container'>
          <CurrentInfo />
        </div>
        <HistoricInfo />
      </header>
    </div>
  );
}

export default App;
