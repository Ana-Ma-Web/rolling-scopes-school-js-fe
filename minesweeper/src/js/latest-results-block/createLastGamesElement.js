import countTime from "../info-block/countTime";
import convertDateToString from "./convertDateToString";
import createInfoElement from "./createInfoElement";

const createLastGamesElement = (latestResults) => {
  const latestResultsBlock = document.createElement("div");
  latestResultsBlock.classList.add("last-games");

  const latestResultsTitle = document.createElement("div");
  latestResultsTitle.classList.add("last-games__subtitle", "subtitle");
  latestResultsTitle.innerHTML = "Latest results:";

  const infoInLatestResults = document.createElement("div");
  infoInLatestResults.classList.add("last-games__info", "subtitle");
  infoInLatestResults.append(createInfoElement());

  const latestResultsList = document.createElement("ul");
  latestResultsList.classList.add("last-games__list");

  latestResults.forEach((item) => {
    const latestResultsItem = document.createElement("li");
    latestResultsItem.classList.add("last-games__item");

    const latestResultsDate = document.createElement("div");
    latestResultsDate.classList.add("last-games__date");
    latestResultsDate.innerHTML = convertDateToString(Date.parse(item.date));

    const latestResultsTime = document.createElement("div");
    latestResultsTime.classList.add("last-games__time");
    latestResultsTime.innerHTML = `Time: ${countTime(item.time)}`;

    const latestResultsClicks = document.createElement("div");
    latestResultsClicks.classList.add("last-games__clicks");
    latestResultsClicks.innerHTML = `Clicks: ${item.clicks}`;

    const latestResultsFieldSize = document.createElement("div");
    latestResultsFieldSize.classList.add("last-games__field-size");
    latestResultsFieldSize.innerHTML = `Size: 
    ${item.fieldSize.slice(-2)}`;

    const latestResultsMinesNumber = document.createElement("div");
    latestResultsMinesNumber.classList.add("last-games__mines-number");
    latestResultsMinesNumber.innerHTML = `Mines: ${item.minesNumber}`;

    latestResultsItem.append(
      latestResultsDate,
      latestResultsTime,
      latestResultsClicks,
      latestResultsFieldSize,
      latestResultsMinesNumber
    );
    latestResultsList.append(latestResultsItem);
  });

  latestResultsBlock.append(latestResultsList, infoInLatestResults);
  return latestResultsBlock;
};

export default createLastGamesElement;
