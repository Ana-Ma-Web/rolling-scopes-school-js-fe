import updateField from "../cell-field-block/updateField";
import createDefaultCells from "../data/createDefaultCells";
import updateInfoMenu from "../info-block/updateInfoMenu";
import updateLocalStorage from "../updateLocalStorage";

const startNewGameHandler = (data) => {
  data.isCellClicked = false;
  data.isDisabled = false;
  data.minesInGameNumber = data.minesCurNumber;
  data.fieldInGameSize = data.fieldCurSize;
  data.openCellCount = 0;
  data.clicks = 0;
  data.cellsAtField = createDefaultCells(+data.fieldInGameSize.slice(-2));
  updateField(data);
  updateLocalStorage();
  updateInfoMenu(
    data.fieldInGameSize,
    data.openCellCount,
    data.minesInGameNumber,
    data.isSoundOn,
    data.clicks
  );
};
export default startNewGameHandler;
