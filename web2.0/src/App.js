import CurrentInfo from './Components/CurrentInfo';
import HistoricInfo from './Components/HistoricInfo';

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
