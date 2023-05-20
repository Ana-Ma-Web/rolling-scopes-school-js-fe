import updateClicks from "./updateClicks";
import updateTime from "./updateTime";
import updateRestCells from "./updateRestCells";
import updateRestMines from "./updateRestMines";

const updateInfoMenu = (isSoundOn, clicks, time) => {
  updateClicks(clicks);
  updateTime(time);
  updateRestCells(isSoundOn);
  updateRestMines();
};

export default updateInfoMenu;
