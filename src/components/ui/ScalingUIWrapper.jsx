import "./ScalingUIWrapper.css";
import SearchBarContainer from "./SearchBarContainer";
import DeckContainer from "./DeckContainer";
import FavesDropdownContainer from "./FavesDropdownContainer";
import { useMusicPlayer } from "../../MusicPlayer";
import { useState } from "react";

export default function ScalingUIWrapper() {
  const { setPlaylist, loadTrack, play } = useMusicPlayer();
  const [ledOn, setLedOn] = useState(false);

  const searchItunes = async (query) => {
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music&entity=song&limit=50`
      );

      const json = await res.json();
      const results = json.results || [];

      return results.map((item) => {
        const smallArt = item.artworkUrl100 || "";
        const largeArt = smallArt
          .replace("100x100bb", "600x600bb")
          .replace("100x100", "600x600");

        return {
          id: item.trackId,
          title: item.trackName,
          preview: item.previewUrl,
          duration: item.trackTimeMillis
            ? Math.round(item.trackTimeMillis / 1000)
            : null,
          artist: { name: item.artistName },
          album: {
            title: item.collectionName,
            cover_big: largeArt,
            cover_medium: smallArt,
            cover: smallArt,
          },
          raw: item,
        };
      });
    } catch {
      return [];
    }
  };

  const handleSearch = async (query) => {
    const results = await searchItunes(query);

    if (!results || results.length === 0) {
      setLedOn(false);
      return;
    }

    setPlaylist(results);
    loadTrack(results[0]);
    play();

    setLedOn(true);
    setTimeout(() => setLedOn(false), 2400);
  };

  return (
    <div className="scaling-wrapper">

      <div className="searchbar-row">
        <SearchBarContainer onSearch={handleSearch} ledOn={ledOn} />
      </div>

      <div className="deck-row">
        <DeckContainer />
      </div>

    </div>
  );
}
