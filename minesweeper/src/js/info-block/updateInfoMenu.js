import updateClicks from "./updateClicks";
import updateTime from "./updateTime";
import updateRestCells from "./updateRestCells";

const updateInfoMenu = (
  fieldInGameSize,
  openCellCount,
  minesInGameNumber,
  isSoundOn,
  clicks,
  time
) => {
  updateClicks(clicks);
  updateTime(time);
  updateRestCells(fieldInGameSize, openCellCount, minesInGameNumber, isSoundOn);
};

export default updateInfoMenu;
