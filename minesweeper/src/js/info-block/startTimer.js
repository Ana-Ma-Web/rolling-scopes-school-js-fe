import data from "../data/data";
import updateTime from "./updateTime";

const startTimer = () => {
  console.log("start timer");
  setInterval(() => {
    if (!data.isPaused) {
      data.time++;
      updateTime(data.time);
    }
  }, 1000);
};

export default startTimer;
