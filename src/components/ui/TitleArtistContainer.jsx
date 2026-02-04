import "./TitleArtistContainer.css";
import { useMusicPlayer } from "../../MusicPlayer.jsx";

export default function TitleArtistContainer() {
  const { currentTrack } = useMusicPlayer();

  const title =
    typeof currentTrack?.title === "string"
      ? currentTrack.title
      : currentTrack?.title?.name;

  const artist =
    typeof currentTrack?.artist === "string"
      ? currentTrack.artist
      : currentTrack?.artist?.name;

  return (
    <div className="title-artist-container">
      <div className="title-placeholder">
        {title || "TITLE"}
      </div>
      <div className="artist-placeholder">
        {artist || "ARTIST"}
      </div>
    </div>
  );
}
