import updateClicks from "./updateClicks";
import updateRestCells from "./updateRestCells";

const updateInfoMenu = (
  fieldInGameSize,
  openCellCount,
  minesInGameNumber,
  isSoundOn,
  clicks
) => {
  updateClicks(clicks);
  updateRestCells(fieldInGameSize, openCellCount, minesInGameNumber, isSoundOn);
};

export default updateInfoMenu;
