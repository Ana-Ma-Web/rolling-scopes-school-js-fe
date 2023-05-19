import createDefaultCells from "./createDefaultCells";

const createDefaultData = () => {
  const data = {
    minesCurNumber: 10,
    minesInGameNumber: 10,
    fieldCurSize: "easy 10x10",
    fieldInGameSize: "easy 10x10",
    isCellClicked: false,
    cellsAtField: [],
    isSoundOn: true,
    isDarkTheme: false,
    openCellCount: 0,
    timeStart: 0,
    timeEnd: 0,
    clicks: 0,
    isDisabled: false,
    isLose: false,
    latestResults: [
      {
        timeStart: 41234244,
        timeEnd: 51254244,
        clicks: 100,
      },
      {
        timeStart: 51234244,
        timeEnd: 51256744,
        clicks: 50,
      },
    ],
  };

  const size = +data.fieldInGameSize.slice(-2);
  data.cellsAtField = createDefaultCells(size);
  return data;
};

export default createDefaultData;
