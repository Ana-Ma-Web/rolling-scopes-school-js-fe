import countTime from "./info-block/countTime";
import createLastGamesElement from "./latest-results-block/createLastGamesElement";
import createInfoElement from "./info-block/createInfoElement";
import createSettingsElement from "./settings-block/createSettingsElement";
import updateField from "./cell-field-block/updateField";
import restCellsCount from "./info-block/restCellsCount";

const firstRender = (data) => {
  const body = document.querySelector("body");
  if (data.isDarkTheme) body.classList.add("dark-theme");
  body.innerHTML = "";

  const count = restCellsCount(
    data.fieldInGameSize,
    data.openCellCount,
    data.minesInGameNumber
  );

  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerHTML = "Minesweeper";

  const mainBlock = document.createElement("div");
  mainBlock.classList.add("main");

  const menuBlock = document.createElement("div");
  menuBlock.classList.add("menu");

  const gameField = document.createElement("div");
  gameField.classList.add("game-field");

  const settings = createSettingsElement(
    data.minesCurNumber,
    data.fieldCurSize
  );
  const newGameButton = document.createElement("button");
  newGameButton.classList.add("btn", "btn_new-game");
  newGameButton.innerHTML = "Start new game";

  const message = document.createElement("div");
  message.classList.add("message", "subtitle");

  if (data.isDisabled) {
    if (data.isLose) {
      message.innerHTML = `🚨&nbsp;Game&nbsp;over 🎃&nbsp;Try&nbsp;again&nbsp;⚠️`;
    } else {
      message.innerHTML = `🎊&nbsp;Hooray!&nbsp;🥳 You&nbsp;found&nbsp;all&nbsp;mines in&nbsp;${countTime(
        data.timeStart,
        data.timeEnd
      )}&nbsp;seconds and&nbsp;${data.clicks}&nbsp;moves! 🎉`;
    }
  } else {
    message.innerHTML = `You have to open ${count}&nbsp;more&nbsp;cells&nbsp;👀`;
  }

  const info = createInfoElement(
    data.isSoundOn,
    data.isDarkTheme,
    countTime(data.timeStart, data.timeEnd),
    data.clicks,
    data.openCellCount,
    data.fieldInGameSize,
    data.minesInGameNumber
  );

  const lastGames = createLastGamesElement(data.latestResults);

  menuBlock.append(settings, newGameButton);
  mainBlock.append(menuBlock, message, gameField, info, lastGames);
  body.append(title, mainBlock);

  updateField(data);
};

export default firstRender;
