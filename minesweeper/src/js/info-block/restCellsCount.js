const restCellsCount = (fieldInGameSize, openCellCount, minesInGameNumber) => {
  const maxCellsCount = +fieldInGameSize.slice(-2) * +fieldInGameSize.slice(-2);
  const restCellsCount = maxCellsCount - openCellCount - minesInGameNumber;
  return restCellsCount;
};

export default restCellsCount;
