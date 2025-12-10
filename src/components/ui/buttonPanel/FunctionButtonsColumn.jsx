import btnImg from "../../../assets/btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";
import { useRef } from "react";

export default function FunctionButtonsColumn() {
  const { rewind, play, pause, isPlaying, forward, fastScan } =
    useMusicPlayer();

  const holdRef = useRef(null);
  const downRef = useRef(0);

  const handleForwardDown = () => {
    downRef.current = Date.now();
    holdRef.current = setInterval(() => fastScan(), 350);
  };

  const handleForwardUp = () => {
    clearInterval(holdRef.current);
    const held = Date.now() - downRef.current;
    if (held < 200) forward();
  };

  return (
    <div className="function-col horizontal-buttons">
      <div className="func-stack">
        <button className="func-btn" onClick={rewind}>
          <img src={btnImg} alt="rewind" />
        </button>
      </div>

      <div className="func-stack">
        <button
          className={`func-btn ${isPlaying ? "active" : ""}`}
          onClick={isPlaying ? pause : play}
        >
          <img src={btnImg} alt="play/pause" />
        </button>
      </div>

      <div className="func-stack">
        <button
          className="func-btn"
          onMouseDown={handleForwardDown}
          onMouseUp={handleForwardUp}
          onMouseLeave={handleForwardUp}
        >
          <img src={btnImg} alt="forward" />
        </button>
      </div>
    </div>
  );
}
