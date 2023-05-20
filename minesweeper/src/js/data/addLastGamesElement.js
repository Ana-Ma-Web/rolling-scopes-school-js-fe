import data from "./data";

const addLastGamesElement = () => {
  const obj = {
    date: new Date(),
    time: data.time,
    clicks: data.clicks,
    fieldSize: data.fieldInGameSize,
    minesNumber: data.minesInGameNumber,
  };

  if (data.latestResults.length > 9) data.latestResults.shift();

  data.latestResults.push(obj);
};

export default addLastGamesElement;
