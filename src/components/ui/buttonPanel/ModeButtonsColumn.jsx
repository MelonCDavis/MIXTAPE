import btnImg from "../../../assets/btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";

export default function ModeButtonsColumn() {
  const { shuffle, toggleShuffle, repeat, toggleRepeat } = useMusicPlayer();

  return (
    <div className="mode-col horizontal-buttons">

      <div className="mode-stack">
        <div className={`unified-led ${shuffle ? "on" : ""}`} />
        <button
          className={`mode-btn ${shuffle ? "active" : ""}`}
          onClick={toggleShuffle}
        >
          <img src={btnImg} alt="Shuffle" />
        </button>
      </div>

      <div className="mode-stack">
        <div className={`unified-led ${repeat ? "on" : ""}`} />
        <button
          className={`mode-btn ${repeat ? "active" : ""}`}
          onClick={toggleRepeat}
        >
          <img src={btnImg} alt="Repeat" />
        </button>
      </div>

    </div>
  );
}
