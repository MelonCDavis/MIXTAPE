import { useEffect, useState } from "react";
import "./index.css";
import { MusicPlayerProvider } from "./MusicPlayer";

import Boombox from "./components/ui/Boombox";

function App() {
  const BASE_WIDTH = 1400;
  const BASE_HEIGHT = 860;

  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const scaleX = window.innerWidth / BASE_WIDTH;
      const scaleY = window.innerHeight / BASE_HEIGHT;

      const nextScale = Math.min(scaleX, scaleY, 1);
      setScale(nextScale);
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <MusicPlayerProvider>
     <div className="app-bg">
      <div
        className="scaling-wrapper"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="boombox-stage">
          <Boombox />
        </div>
      </div>
    </div>
    </MusicPlayerProvider>
  );
}

export default App;
