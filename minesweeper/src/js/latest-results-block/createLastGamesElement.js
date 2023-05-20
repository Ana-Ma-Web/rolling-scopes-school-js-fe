import countTime from "../info-block/countTime";
import convertDateToString from "./convertDateToString";

const createLastGamesElement = (latestResults) => {
  const latestResultsBlock = document.createElement("div");
  latestResultsBlock.classList.add("last-games");

  const latestResultsList = document.createElement("ul");
  latestResultsList.classList.add("last-games__list");

  latestResults.forEach((item) => {
    const latestResultsItem = document.createElement("li");
    latestResultsItem.classList.add("last-games__item");

    const latestResultsDate = document.createElement("div");
    latestResultsDate.classList.add("last-games__date");
    console.log(typeof Date.parse(item.date));
    latestResultsDate.innerHTML = convertDateToString(Date.parse(item.date));

    const latestResultsTime = document.createElement("div");
    latestResultsTime.classList.add("last-games__time");
    latestResultsTime.innerHTML = `Time: ${countTime(item.time)}`;

    const latestResultsClicks = document.createElement("div");
    latestResultsClicks.classList.add("last-games__clicks");
    latestResultsClicks.innerHTML = `Clicks: ${item.clicks}`;

    const latestResultsFieldSize = document.createElement("div");
    latestResultsFieldSize.classList.add("last-games__field-size");
    latestResultsFieldSize.innerHTML = `Field size: 
    ${item.fieldSize.slice(-2)}`;

    const latestResultsMinesNumber = document.createElement("div");
    latestResultsMinesNumber.classList.add("last-games__mines-number");
    latestResultsMinesNumber.innerHTML = `Mines number: ${item.minesNumber}`;

    latestResultsItem.append(
      latestResultsDate,
      latestResultsTime,
      latestResultsClicks,
      latestResultsFieldSize,
      latestResultsMinesNumber
    );
    latestResultsList.append(latestResultsItem);
  });

  latestResultsBlock.append(latestResultsList);
  console.log(latestResultsBlock, "latestResultsBlock");
  return latestResultsBlock;
};

export default createLastGamesElement;
