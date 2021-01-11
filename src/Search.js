

function Search() {
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
