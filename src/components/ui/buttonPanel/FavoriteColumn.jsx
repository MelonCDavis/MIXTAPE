import "./FavoriteColumn.css";
import btnImg from "../../../assets/btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";

export default function FavoriteColumn() {
  const { isFavorite, toggleFavorite, currentTrack } = useMusicPlayer();

  return (
    <div className="favorite-col" style={{ pointerEvents: "auto" }}>
      <div
        className={`led ${isFavorite ? "led-on" : ""}`}
        style={{ pointerEvents: "none" }}
      ></div>

      <button
        className={`fav-btn ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(currentTrack)}
        style={{ pointerEvents: "auto" }}
      >
        <img src={btnImg} alt="Favorite" />
      </button>
    </div>
  );
}
