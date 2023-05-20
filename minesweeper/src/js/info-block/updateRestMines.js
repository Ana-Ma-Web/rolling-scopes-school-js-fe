import restMinesCount from "./restMinesCount";

const updateRestMines = () => {
  const flagCount = restMinesCount();

  const flagCountElement = document.querySelector(".info__rest-flags");
  const mineCountElement = document.querySelector(".info__rest-mines");

  mineCountElement.innerHTML = `Mines: ${flagCount > 0 ? flagCount : 0}`;
  flagCountElement.innerHTML = `Flags: ${flagCount}`;
};
export default updateRestMines;
