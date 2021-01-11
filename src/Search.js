import { useState, useEffect } from 'react'
import axios from 'axios';

function Search() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&t=${value}`;
    axios.get(URL).then(response => {
      console.log(response.data)
      setResults(response.data.title)
    });
  }, [value])
  
  const result = results && results.map(movie => {
    return <p>{movie.title}</p>
  })

  return (
    <div className="searchBarContainer">
      <form onSubmit={event => event.preventDefault()}>
        <input className="searchBar"
          type="text"
          name="search"
          placeholder="Search for an movie..."
          spellcheck="false"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
      <div>{result}</div>
    </div>
  );
}

export default Search;
