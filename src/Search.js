import { useState, useEffect } from 'react';
import axios from 'axios';

import './Search.css';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [nominee, setNominee] = useState(JSON.parse(localStorage.getItem('nomineeList')) || []);


  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
    axios.get(URL).then(response => {
      setResults([response.data.Search]);
    });
  }, [value]);

  useEffect(() => {
    localStorage.setItem('nomineeList', JSON.stringify(nominee));
  }, [nominee]);

  const result = results[0] && results[0].map(movie => {
    if (movie.Title) {
      return (
        <div className="result">
          <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
          <div className="result-content">Title: {movie.Title}</div>
          <div className="result-content">Year Released: {movie.Year}</div>
          <button
            className="nominate-button"
            type="button"
            onClick={() => setNominee([...nominee, [movie.Title, movie.Poster]])}
            disabled={nominee.find(n => n[0] === movie.Title)}
          >Nominate</button>
        </div>
      );
    }
  });

  const nominees = nominee.map(nom => {
    return <div className="tooltiptext">
      <img src={nom[1]} alt={nom[0]} width="78" height="104"></img>
      <div className="nom-title">{nom[0]}</div>
      <button className="remove-nominee" type="button" onClick={() => removeNominee(nom)}>Remove</button>
    </div>;
  });

  const nominneConditional = function () {
    if (nominee.length <= 0) {
      return null;
    } else if (nominee.length === 5) {
      return <div>
        <div className="tooltip"><i className="fa fa-film"></i>{nominees}
        </div>
      </div>;
    } else {
      return (<div>
        <div className="tooltip"><i className="fa fa-film"></i>{nominees}</div>
        <div className="arrow"><i className="fas fa-sort-up"></i></div>
      </div>);
    }
  };

  const removeNominee = function (nom) {
    const newList = nominee.filter((item) => item !== nom);
    setNominee(newList);
  };

  const nomineeFinish = function () {
    if (nominee.length === 5) {
      return <div className="thanks-container">
        <div>THANK YOU FOR VOTING</div>
      </div>;
    } else {
      return (
        <div>
          <form className="search-container" onSubmit={event => event.preventDefault()}>
            <input className="search-bar"
              type="text"
              name="search"
              placeholder="Search for an movie..."
              spellCheck="false"
              autoComplete="off"
              value={value}
              onChange={event => setValue(event.target.value)}
            />
          </form>
          <div className="result-container">
            {result}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="Search">
      <div className="nominee-container">
        {nominneConditional()}
      </div>
      {nomineeFinish()}
    </div>
  );
}

export default Search;
