import "./index.css";
import { MusicPlayerProvider } from "./MusicPlayer";

import Boombox from "./components/ui/Boombox";

function App() {
  return (
    <MusicPlayerProvider>
      <div className="app-bg">
        <Boombox />
      </div>
    </MusicPlayerProvider>
  );
}

export default App;
