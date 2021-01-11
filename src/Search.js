import { useState, useEffect } from 'react'
import axios from 'axios';

function Search() {
  const [value, setValue] = useState(""); 

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&t=${value}`;
    axios.get(URL).then(response => {
      console.log(response)
    });
  }, [value])

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
      <div></div>
    </div>
  );
}

export default Search;
