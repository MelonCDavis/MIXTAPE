import { useState } from "react";
import "./SearchBarContainer.css";

export default function SearchBarContainer({ onSearch }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") onSearch(query.trim());
  };

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        
        <div className="search-label">SEARCH</div>

        <div className={`search-led ${focused || query ? "led-on" : ""}`}></div>

        <input
          className="search-input"
          placeholder="Search…"
          type="text"
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="search-button" type="submit">GO</button>

      </form>
    </div>
  );
}
