import "./CassetteArtContainer.css";
import { useMusicPlayer } from "../../MusicPlayer";

export default function CassetteArtContainer() {
  const { currentTrack } = useMusicPlayer();

  const art =
    currentTrack?.album?.cover_big ||
    currentTrack?.album?.cover_medium ||
    currentTrack?.album?.cover ||
    null;

  return (
    <div className="cassette-art-outer">
      <div className="cassette-art-inner">
        {art ? (
          <img src={art} alt="Album art" />
        ) : (
          <div className="cassette-art-placeholder"></div>
        )}
      </div>
    </div>
  );
}
