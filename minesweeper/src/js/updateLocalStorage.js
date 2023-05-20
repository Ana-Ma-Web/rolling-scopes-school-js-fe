import data from "./data/data";

const updateLocalStorage = () => {
  localStorage.setItem("minesweeper-game-data", JSON.stringify(data));
};

export default updateLocalStorage;
