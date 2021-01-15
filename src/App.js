import './App.css';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <div className="app-title">The Shoppies!</div>
      <div className="sub-title">Movie awards for entrepreneurs</div>
      <Search />
      <div className="footer-container">
        <div className="footer">Made by <a href="https://github.com/davidMfolkins" target="_blank" rel="noreferrer">David</a></div>
        </div>
    </div>
  );
}

export default App;
