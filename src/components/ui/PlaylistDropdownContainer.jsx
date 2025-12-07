import { useEffect, useRef } from "react";
import "./PlaylistDropdownContainer.css";

export default function PlaylistDropdownContainer({
  playlist = [],           
  currentTrackId = null,   
  onSelect = () => {},     
}) {
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

  return (
    <div className="playlist-container">
      <div className="playlist-inner">

        {playlist.length === 0 ? (
          <div className="playlist-empty">No tracks loaded</div>
        ) : (
          playlist.map((track, index) => {
            const isActive = track.id === currentTrackId;

            return (
              <div
                key={track.id}
                ref={(el) => (refs.current[index] = el)}
                className={`playlist-item ${isActive ? "active" : ""}`}
                onClick={() => onSelect(track)}
              >
                <span className="playlist-track-number">
                  {index + 1}.
                </span>

                <span className="playlist-track-title">
                  {track.title}
                </span>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}
