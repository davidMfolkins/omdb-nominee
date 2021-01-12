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
    const URL = `https://omdbapi.com/?apikey=a086c7ae&s=${value}`;
    axios.get(URL).then(response => {
      setResults([response.data.Search])
    });
  }, [value])

  const result = results[0] && results[0].map(movie => {
    console.log(movie)
    if (movie.Title) {
      return (
        <div className="result">
          <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
          <div>Title: {movie.Title}</div>
          <div>Year Released: {movie.Year}</div>
          <button
            type="button"
            onClick={() => setNominee([...nominee, movie.Title])}
            disabled={buttonDisabled}
            >Nominate</button>
        </div>
      )
    }
  })


  const removeNominee = function (nom) {
    console.log(nominee)
    const newList = nominee.filter((item) => item.nom !== nom)
    setNominee(newList)
    setButtonDisabled(false)
  }

  const nominees = nominee.map(nom => {
    return <div className="tooltiptext">
      {nom}
      <button type="button" onClick={() => removeNominee()}>Remove Nominations</button>
    </div>
  })

  const nominneConditional = function () {
    if (nominee.length <= 0) {
      return <div className="tooltip">Search to select Nominees!</div>
    } else if (nominee.length === 5) {
      return <div>
        <div className="tooltip">Thank you for your Nominations! Your Nominees: {nominees}</div>
      </div>
    } else {
      return (<div>
        <div className="tooltip">Your Nominees: {nominees}</div>
      </div>)
    }
  }

  return (
    <div className="Search">
      <div className="nominee-container">
        {nominneConditional()}
      </div>
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
  );
}

export default Search;
