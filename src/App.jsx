import "./index.css";
import ScalingUIWrapper from "./components/ui/ScalingUIWrapper";
import { MusicPlayerProvider } from "./MusicPlayer";

function App() {
  return (
    <MusicPlayerProvider>
      <div className="app-bg">
        <ScalingUIWrapper />
      </div>
    </MusicPlayerProvider>
  );
}

export default App;
