import updateClicks from "./updateClicks";
import updateTime from "./updateTime";
import updateRestCells from "./updateRestCells";

const updateInfoMenu = (isSoundOn, clicks, time) => {
  console.log(time, "updateInfoMenu");
  updateClicks(clicks);
  updateTime(time);
  updateRestCells(isSoundOn);
};

export default updateInfoMenu;
