const createDefaultCells = (size) => {
  const defaultCells = [];

  for (let i = 0; i < size; i++) {
    defaultCells.push([]);
    for (let j = 0; j < size; j++) {
      const defaultCell = {
        isOpen: false,
        isFlag: false,
        isMine: false,
        isExpl: false,
        ij: i + "-" + j,
        text: "",
      };
      defaultCells[i].push(defaultCell);
    }
  }

  return defaultCells;
};

export default createDefaultCells;
