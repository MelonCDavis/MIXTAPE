import "./ButtonPanelContainer.css";

import VolumeColumn from "./buttonPanel/VolumeColumn";
import FavoriteColumn from "./buttonPanel/FavoriteColumn";
import FunctionButtonsColumn from "./buttonPanel/FunctionButtonsColumn";
import ModeButtonsColumn from "./buttonPanel/ModeButtonsColumn";

export default function ButtonPanelContainer() {
  return (
    <div className="button-panel-wrapper">
      <VolumeColumn />
      <FavoriteColumn />
      <FunctionButtonsColumn />
      <ModeButtonsColumn />
    </div>
  );
}
