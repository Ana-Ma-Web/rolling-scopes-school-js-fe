import data from "../data/data";
import updateLocalStorage from "../updateLocalStorage";
import updateTime from "./updateTime";

const startTimer = () => {
  clearInterval(data.timer);
  data.timer = setInterval(() => {
    if (!data.isPaused) {
      data.time++;
      updateTime(data.time);
      updateLocalStorage();
    }
  }, 1000);
};

export default startTimer;
