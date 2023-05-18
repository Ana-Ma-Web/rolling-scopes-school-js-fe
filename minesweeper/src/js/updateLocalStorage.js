import data from "./data/data";

const updateLocalStorage = () => {
  localStorage.setItem("minesweeper-data", JSON.stringify(data));
};

export default updateLocalStorage;
