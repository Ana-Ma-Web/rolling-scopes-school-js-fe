import data from "../data/data";
import restMinesCount from "./restMinesCount";

const updateRestMines = () => {
  const flagCount = restMinesCount();

  const flagCountElement = document.querySelector(".info__rest-flags");
  const mineCountElement = document.querySelector(".info__rest-mines");

  flagCountElement.innerHTML = `Flags: ${flagCount}`;

  if (data.isDisabled && !data.isLose) {
    mineCountElement.innerHTML = `Mines: 0`;
  } else {
    mineCountElement.innerHTML = `Mines: ${flagCount > 0 ? flagCount : 0}`;
  }
};
export default updateRestMines;
