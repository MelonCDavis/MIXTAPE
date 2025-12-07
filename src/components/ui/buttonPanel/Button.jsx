import { useState } from "react";
import "./Button.css";

export default function Button({ onClick, isActive = false, led = false }) {
  const [isPressed, setIsPressed] = useState(false);

  const pressDown = () => setIsPressed(true);
  const release = () => {
    setIsPressed(false);
    onClick && onClick();
  };

  return (
    <div
      className={`deck-button 
        ${isPressed ? "pressed" : ""} 
        ${isActive ? "active" : ""}`}
      onMouseDown={pressDown}
      onMouseUp={release}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Optional LED indicator */}
      {led && (
        <div className={`led ${isActive ? "led-on" : ""}`} />
      )}
    </div>
  );
}
