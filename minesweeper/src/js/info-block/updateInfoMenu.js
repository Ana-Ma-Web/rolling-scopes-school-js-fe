import updateClicks from "./updateClicks";
import updateTime from "./updateTime";
import updateRestCells from "./updateRestCells";

const updateInfoMenu = (isSoundOn, clicks, time) => {
  updateClicks(clicks);
  updateTime(time);
  updateRestCells(isSoundOn);
};

export default updateInfoMenu;
