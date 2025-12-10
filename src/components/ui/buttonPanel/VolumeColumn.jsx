import volumeImg from "../../../assets/volume-btn.png";
import { useMusicPlayer } from "../../../MusicPlayer.jsx";
import { useRef } from "react";

export default function VolumeColumn() {
  const { volume, setPlayerVolume } = useMusicPlayer();

  const trackRef = useRef(null);
  const dragging = useRef(false);

  const startDrag = (e) => {
    dragging.current = true;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    onDrag(e);
  };

  const stopDrag = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!dragging.current) return;
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let percent = 1 - y / rect.height;
    percent = Math.max(0, Math.min(1, percent));

    setPlayerVolume(percent);
  };

  const knobY = `${(1 - volume) * 100}%`;

  return (
    <div className="volume-col">
      <div
        className="volume-track"
        ref={trackRef}
        onMouseDown={startDrag}
      >
        <img
          className="volume-knob"
          src={volumeImg}
          alt="Volume"
          style={{ transform: `translate(-50%, ${knobY})` }}
        />
      </div>
    </div>
  );
}
