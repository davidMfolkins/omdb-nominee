import { useState, useEffect } from 'react'
import axios from 'axios';

import './Search.css'

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [nominee, setNominee] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('nomineeList', JSON.stringify(nominee));
  // }, [nominee])

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
        <div className="result-container">
          <img src={movie.Poster} alt={movie.Title} width="300" height="400"></img>
          <div>Title: {movie.Title}</div>
          <div>Year Released: {movie.Year}</div>
          <button type="button" onClick={() => setNominee([...nominee, movie.Title])}>Nominate</button>
        </div>
      )
    }
  })
  console.log(nominee)
  const nominees = nominee.map(nom => {
    return <div>{nom}</div>
  })

  return (
    <div className="Search">
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
      <div className="test">
        {result}
      </div>
      <div>Your Nominees: {nominees}</div>
    </div>
  );
}

export default Search;
