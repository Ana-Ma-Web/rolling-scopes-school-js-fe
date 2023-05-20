import countTime from "./countTime";

const updateTime = (time) => {
  console.log(time);
  const targetElement = document.querySelector(".info__time");

  targetElement.innerHTML = `Time: ${countTime(time)}`;
};

export default updateTime;
