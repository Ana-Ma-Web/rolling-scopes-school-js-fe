import createDefaultCells from "./createDefaultCells";

const createDefaultData = () => {
  const data = {
    minesCurNumber: 10,
    minesInGameNumber: 10,
    fieldCurSize: "easy 10x10",
    fieldInGameSize: "easy 10x10",
    isCellClicked: false,
    isSoundOn: true,
    isDarkTheme: false,
    openCellCount: 0,
    setFlagCount: 0,
    time: 0,
    clicks: 0,
    isDisabled: false,
    isLose: false,
    isPaused: false,
    cellsAtField: [],
    timer: () => {},
    latestResults: [],
  };

  const size = +data.fieldInGameSize.slice(-2);
  data.cellsAtField = createDefaultCells(size);
  return data;
};

export default createDefaultData;
