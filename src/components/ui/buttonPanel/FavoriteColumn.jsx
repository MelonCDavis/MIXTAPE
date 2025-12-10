import btnImg from "../../../assets/btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";

export default function FavoriteColumn() {
  const { isFavorite, toggleFavorite, currentTrack } = useMusicPlayer();

  return (
    <div className="favorite-col fav-stack">
      <div className={`unified-led ${isFavorite ? "on" : ""}`} />

      <button
        className={`fav-btn ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(currentTrack)}
      >
        <img src={btnImg} alt="Favorite" />
      </button>
    </div>
  );
}
