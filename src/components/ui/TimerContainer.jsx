import "./TimerContainer.css";
import { useMusicPlayer } from "../../MusicPlayer.jsx";

export default function TimerContainer() {
  const { progress, audioRef } = useMusicPlayer();

  const current = progress;

  const duration = audioRef.current?.duration || 0;

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-screen">
        {formatTime(current)}/{formatTime(duration)}
      </div>
    </div>
  );
}
