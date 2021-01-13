import { useState, useEffect } from 'react'
import axios from 'axios';

import './Search.css'

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [nominee, setNominee] = useState(JSON.parse(localStorage.getItem('nomineeList')) || []);

  useEffect(() => {
    localStorage.setItem('nomineeList', JSON.stringify(nominee));
  }, [nominee])

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&s=${value}&type=movie`;
    axios.get(URL).then(response => {
      console.log(response)
      setResults([response.data.Search])
    });
  }, [value])

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
            onClick={() => setNominee([...nominee, movie.Title])}
            disabled={buttonDisabled}
          >Nominate</button>
        </div>
      )
    }
  })

  const removeNominee = function(nom) {
    const newList = nominee.filter((item) => item !== nom)
    setNominee(newList)
    setButtonDisabled(false)
  }

  const nominees = nominee.map(nom => {
    return <div className="tooltiptext">
      <div className="nom-title">{nom}</div>
      <button className="remove-nominee" type="button" onClick={() => removeNominee(nom)}>Remove</button>
    </div>
  })

  const nominneConditional = function () {
    if (nominee.length <= 0) {
      return <div className="tooltip">Search to select Nominees!</div>
    } else if (nominee.length === 5) {
      return <div>
        <div className="tooltip">Thank you for your Nominations!{nominees}
        </div>
      </div>
    } else {
      return (<div>
        <div className="tooltip">Hover to see your Nominees! {nominees}</div>
      </div>)
    }
  }

  const nomineeFinish = function () {
    if (nominee.length === 5) {
      return <div>THANK YOU FOR VOTING</div>
    } else {
      return (
        <div>
          <form className="search-container" onSubmit={event => event.preventDefault()}>
            <input className="search-bar"
              type="text"
              name="search"
              placeholder="Search for an movie..."
              spellcheck="false"
              autocomplete="off"
              value={value}
              onChange={event => setValue(event.target.value)}
            />
          </form>
          <div className="result-container">
            {result}
          </div>
        </div>
      )
    }
  }

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
