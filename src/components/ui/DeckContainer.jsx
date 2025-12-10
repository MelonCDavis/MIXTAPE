import "./DeckContainer.css";
import uiSkin from "../../assets/UI-skin.png";

import CassetteArtContainer from "./CassetteArtContainer";
import TitleArtistContainer from "./TitleArtistContainer";
import TimerContainer from "./TimerContainer";
import ButtonPanelContainer from "./ButtonPanelContainer";
import PlaylistDropdownContainer from "./PlaylistDropdownContainer";

import { useMusicPlayer } from "../../MusicPlayer.jsx";

export default function DeckContainer() {
  const { playlist, currentTrack, loadTrack, play, isFavesOpen } =
    useMusicPlayer();

  return (
    <div className={`deck-container ${isFavesOpen ? "shifted" : ""}`}>
      <img src={uiSkin} alt="Cassette deck" className="deck-bg" />

      <CassetteArtContainer />
      <TitleArtistContainer />
      <TimerContainer />
      <ButtonPanelContainer />

      <PlaylistDropdownContainer
        playlist={playlist}
        currentTrackId={currentTrack?.id}
        onSelect={(track) => {
          loadTrack(track);
          play();
        }}
      />
    </div>
  );
}
