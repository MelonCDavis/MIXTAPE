import { useEffect, useRef } from "react";
import "./FavesDropdownContainer.css";
import favesBg from "../../assets/faves-dropdown.png";
import { useMusicPlayer } from "../../MusicPlayer.jsx";

export default function FavesDropdownContainer() {
  const {
    favorites,
    currentTrack,
    loadTrack,
    play,
    isFavesOpen,
    setIsFavesOpen,
    activeList,
    setActiveList,
    playlist,
    favesManuallyClosed,
    setFavesManuallyClosed,
  } = useMusicPlayer();

  const itemRefs = useRef([]);

  useEffect(() => {
    if (!favorites.length) return;
    const idx = favorites.findIndex((t) => t.id === currentTrack?.id);
    const el = itemRefs.current[idx];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [favorites, currentTrack]);

  if (!favorites.length && !isFavesOpen) return null;

  const handleSelect = (track) => {
    setActiveList("favorites");
    loadTrack(track);
    play();
  };

  const handleClose = () => {
    const playlistContains = playlist.some(
      (t) => t.id === currentTrack?.id
    );

    setIsFavesOpen(false);
    setActiveList("playlist");
    setFavesManuallyClosed(true);

    if (!playlistContains && playlist.length > 0) {
      loadTrack(playlist[0]);
      play();
    }
  };

  return (
    <div className={`faves-panel ${isFavesOpen ? "open" : ""}`}>
      <button className="faves-close" onClick={handleClose}>×</button>

      <img src={favesBg} alt="Favorites" className="faves-bg" />

      <div className="faves-inner">
        <div className="faves-list">
          {favorites.length === 0 ? (
            <div className="faves-empty">No favorites yet</div>
          ) : (
            favorites.map((track, index) => {
              const title = track.title || track.trackName || "Untitled";
              const artist =
                track.artistName ||
                track.artist?.name ||
                "";

              const active = currentTrack && track.id === currentTrack.id;

              return (
                <div
                  key={track.id || `${title}-${index}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={
                    "faves-item" + (active ? " favorites-active" : "")
                  }
                  onClick={() => handleSelect(track)}
                >
                  <span className="faves-index">{index + 1}.</span>
                  <span className="faves-text">
                    {title}{artist ? ` – ${artist}` : ""}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
