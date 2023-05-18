import countTime from "../info-block/countTime";

const createLastGamesElement = (latestResults) => {
  const latestResultsBlock = document.createElement("div");
  latestResultsBlock.classList.add("last-games");

  const latestResultsList = document.createElement("ul");
  latestResultsList.classList.add("last-games__list");

  latestResults.forEach((item) => {
    const latestResultsItem = document.createElement("li");
    latestResultsItem.classList.add("last-games__item");

    const latestResultsTime = document.createElement("div");
    latestResultsTime.classList.add("last-games__time");
    latestResultsTime.innerHTML = `Time : ${countTime(
      item.timeStart,
      item.timeEnd
    )}`;

    const latestResultsClicks = document.createElement("div");
    latestResultsClicks.classList.add("last-games__clicks");
    latestResultsClicks.innerHTML = `Clicks : ${item.clicks}`;

    latestResultsItem.append(latestResultsTime, latestResultsClicks);
    latestResultsList.append(latestResultsItem);
  });

  latestResultsBlock.append(latestResultsList);
  return latestResultsBlock;
};

export default createLastGamesElement;
