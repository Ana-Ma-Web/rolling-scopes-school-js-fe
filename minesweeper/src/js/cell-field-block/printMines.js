import data from "../data/data";

const printMines = () => {
  const cellsArr = document.querySelectorAll(".cell");

  cellsArr.forEach((curNode) => {
    const ijArr = curNode.dataset.ij.split("-");
    const x = +ijArr[0];
    const y = +ijArr[1];

    const curCellObj = data.cellsAtField[x][y];

    if (curCellObj.isMine) {
      curNode.classList.add("cell_mine");
    }
    if (curCellObj.isExpl) {
      curNode.classList.add("cell_expl");
    }
  });
};

export default printMines;
