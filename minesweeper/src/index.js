import "./scss/main.scss";
import data from "./js/data";
import firstRender from "./js/firstRender.js";
import firstHandlers from "./js/firstHandlers";

window.onload = function () {
  firstRender(data);
  firstHandlers(data);
};
