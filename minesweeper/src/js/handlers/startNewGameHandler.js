import updateField from "../cell-field-block/updateField";
import createDefaultCells from "../data/createDefaultCells";
import updateInfoMenu from "../info-block/updateInfoMenu";
import updateLocalStorage from "../updateLocalStorage";

const startNewGameHandler = (data) => {
  data.minesInGameNumber = data.minesCurNumber;
  data.fieldInGameSize = data.fieldCurSize;
  data.isCellClicked = false;
  data.openCellCount = 0;
  data.setFlagCount = 0;
  data.time = 0;
  data.clicks = 0;
  data.isDisabled = false;
  data.isLose = false;
  data.isPaused = true;
  data.cellsAtField = createDefaultCells(+data.fieldInGameSize.slice(-2));
  updateField(data);
  updateLocalStorage();
  updateInfoMenu(data.isSoundOn, data.clicks, data.time);
};
export default startNewGameHandler;
