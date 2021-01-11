import { useEffect } from 'react'
import axios from 'axios';

function Search() {

  useEffect(() => {
    const URL = `https://omdbapi.com/?apikey=a086c7ae&t=blade+runner`;
    axios.get(URL).then(response => {
      console.log(response)
    });
  }, [])

  return (
    <div className="searchBarContainer">
      <form onSubmit={event => event.preventDefault()}>
        <input className="searchBar"
          type="text"
          name="search"
          placeholder="Search for an movie..."
          spellcheck="false"
        />
      </form>
    </div>
  );
}

export default Search;
