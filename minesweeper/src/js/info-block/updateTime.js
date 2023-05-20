import countTime from "./countTime";

const updateTime = (time) => {
  const targetElement = document.querySelector(".info__time");

  targetElement.innerHTML = `Time: ${countTime(time)}`;
};

export default updateTime;
