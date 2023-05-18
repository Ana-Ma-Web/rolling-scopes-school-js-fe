import createDefaultData from "./createDefaultData";

let data = localStorage.getItem("minesweeper-data")
  ? JSON.parse(localStorage.getItem("minesweeper-data"))
  : createDefaultData();

export default data;
