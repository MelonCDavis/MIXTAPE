import "./ModeButtonsColumn.css";
import btnImg from "../../../assets/btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";

export default function ModeButtonsColumn() {
  const { shuffle, toggleShuffle, repeat, toggleRepeat } = useMusicPlayer();

  return (
    <div className="mode-col" style={{ pointerEvents: "auto" }}>

      <div className="mode-item" style={{ pointerEvents: "auto" }}>
        <div
          className={`led ${shuffle ? "led-on" : ""}`}
          style={{ pointerEvents: "none" }}
        ></div>

        <button
          className={`mode-btn ${shuffle ? "active" : ""}`}
          onClick={toggleShuffle}
          style={{ pointerEvents: "auto" }}
        >
          <img src={btnImg} alt="Shuffle" />
        </button>
      </div>

      <div className="mode-item" style={{ pointerEvents: "auto" }}>
        <div
          className={`led ${repeat ? "led-on" : ""}`}
          style={{ pointerEvents: "none" }}
        ></div>

        <button
          className={`mode-btn ${repeat ? "active" : ""}`}
          onClick={toggleRepeat}
          style={{ pointerEvents: "auto" }}
        >
          <img src={btnImg} alt="Repeat" />
        </button>
      </div>

    </div>
  );
}
