import { useState, useEffect } from 'react'
import axios from 'axios';

function Search() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&t=${value}`;
    axios.get(URL).then(response => {
      setResults([response.data])
    });
  }, [value])


  const result = results.map(movie => {
    console.log(movie)
    if (movie.Title) {
      return (
        <div onClick={()=> console.log("hello")}>
          <img src={movie.Poster} alt={movie.Title} width="200" height="300"></img>
          <div>Title: {movie.Title}</div>
          <div>Year Released: {movie.Released}</div>
          <div>Runtime: {movie.Runtime}</div>
        </div>
      )
    } 
  })

  return (
    <div className="searchBarContainer">
      <form onSubmit={event => event.preventDefault()}>
        <input className="searchBar"
          type="text"
          name="search"
          placeholder="Search for an movie..."
          spellcheck="false"
          autocomplete="off"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
      <div>{result}</div>
    </div>
  );
}

export default Search;
