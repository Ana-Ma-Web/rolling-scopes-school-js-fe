import data from "../data/data";

const restMinesCount = () => {
  return data.minesInGameNumber - data.setFlagCount;
};

export default restMinesCount;
