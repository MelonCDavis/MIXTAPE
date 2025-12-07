import "./ScalingUIWrapper.css";
import SearchBarContainer from "./SearchBarContainer";
import DeckContainer from "./DeckContainer";
import { useMusicPlayer } from "../../MusicPlayer";

export default function ScalingUIWrapper() {
  const { setPlaylist, loadTrack, play } = useMusicPlayer();

  const searchDeezer = async (query) => {
    try {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Deezer search failed:", err);
      return [];
    }
  };

  const handleSearch = async (query) => {
    const results = await searchDeezer(query);

    if (!results || results.length === 0) {
      console.warn("No results for:", query);
      return;
    }

    setPlaylist(results);

    loadTrack(results[0]);
    play();
  };

  return (
    <div className="scaling-wrapper">
      <div className="searchbar-row">
        <SearchBarContainer onSearch={handleSearch} />
      </div>

      <div className="deck-row">
        <DeckContainer />
      </div>
    </div>
  );
}
