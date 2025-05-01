import "./searchbar.css";
function SearchBar() {
  return (
    <div>
      <div className="search-bar">
        <form
          className="search-form border d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
