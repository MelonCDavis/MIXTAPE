import "./Boombox.css";
import ScalingUIWrapper from "./ScalingUIWrapper";
import FavesDropdownContainer from "./FavesDropdownContainer";

export default function Boombox() {
  return (
    <div className="boombox">
      <FavesDropdownContainer />
      <ScalingUIWrapper />
    </div>
  );
}
