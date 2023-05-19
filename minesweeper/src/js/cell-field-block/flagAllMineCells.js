import data from "../data/data";

const flagAllMineCells = () => {
  const cellsArr = document.querySelectorAll(".cell");

  cellsArr.forEach((curNode) => {
    const ijArr = curNode.dataset.ij.split("-");
    const x = +ijArr[0];
    const y = +ijArr[1];

    const curCellObj = data.cellsAtField[x][y];

    if (curCellObj.isMine) {
      curCellObj.isFlag = true;
      curNode.classList.add("cell_flag");
    }
  });
};

export default flagAllMineCells;
