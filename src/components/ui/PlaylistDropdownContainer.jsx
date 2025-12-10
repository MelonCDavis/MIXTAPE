import { useEffect, useRef } from "react";
import { useMusicPlayer } from "../../MusicPlayer.jsx";
import "./PlaylistDropdownContainer.css";

export default function PlaylistDropdownContainer({
  playlist = [],
  currentTrackId = null,
  onSelect = () => {},
}) {
  const { favoritesIds, setIsFavesOpen, setFavesManuallyClosed } =
    useMusicPlayer();

  const refs = useRef([]);

  useEffect(() => {
    if (!playlist.length) return;

    const activeIndex = playlist.findIndex(
      (track) => track.id === currentTrackId
    );

    if (activeIndex >= 0 && refs.current[activeIndex]) {
      refs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentTrackId, playlist]);

  const handleSelect = (track) => {
    onSelect(track);

    const isFav = favoritesIds.includes(track.id);
    if (isFav) {
      setFavesManuallyClosed(false);
      setIsFavesOpen(true);
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-inner">
        {playlist.length === 0 ? (
          <div className="playlist-empty">No tracks loaded</div>
        ) : (
          playlist.map((track, index) => {
            const isActive = track.id === currentTrackId;
            const title = track.title || track.trackName || "Untitled";
            const artist =
              track.artist?.name ||
              track.artistName ||
              "";

            return (
              <div
                key={track.id}
                ref={(el) => (refs.current[index] = el)}
                className={`playlist-item ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(track)}
              >
                <span className="playlist-track-number">
                  {index + 1}.
                </span>

                <span className="playlist-track-title">
                  {title}
                  {artist ? ` – ${artist}` : ""}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
