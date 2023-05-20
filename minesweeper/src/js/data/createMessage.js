import countTime from "../info-block/countTime";
import restCellsCount from "../info-block/restCellsCount";
import data from "./data";

const createMessage = () => {
  const count = restCellsCount(
    data.fieldInGameSize,
    data.openCellCount,
    data.minesInGameNumber
  );

  const time = countTime(data.time);

  return {
    win: `🎊&nbsp;Hooray!&nbsp;🥳 
    You&nbsp;found&nbsp;all&nbsp;mines in&nbsp;${time}&nbsp;seconds 
    and&nbsp;${data.clicks}&nbsp;moves! 🎉`,
    lose: `🚨&nbsp;Game&nbsp;over <button class="btn btn_text btn_start-new-game subtitle">
    🎃<span>Try again</span>⚠️</button>`,
    default: `You have to open ${count}&nbsp;more&nbsp;cells&nbsp;👀`,
  };
};

export default createMessage;
