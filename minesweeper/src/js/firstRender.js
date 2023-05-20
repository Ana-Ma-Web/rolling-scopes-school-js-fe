import createLastGamesElement from "./latest-results-block/createLastGamesElement";
import createInfoElement from "./info-block/createInfoElement";
import createSettingsElement from "./settings-block/createSettingsElement";
import updateField from "./cell-field-block/updateField";
import createMessage from "./data/createMessage";

const firstRender = (data) => {
  data.isPaused = true;
  const body = document.querySelector("body");
  if (data.isDarkTheme) body.classList.add("dark-theme");
  body.innerHTML = "";

  const messageText = createMessage();

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
  newGameButton.classList.add("btn", "btn_new-game", "btn_start-new-game");
  newGameButton.innerHTML = "Start new game";

  const message = document.createElement("div");
  message.classList.add("message", "subtitle");

  if (data.isDisabled) {
    if (data.isLose) {
      message.innerHTML = messageText.lose;
    } else {
      message.innerHTML = messageText.win;
    }
  } else {
    message.innerHTML = messageText.default;
  }

  const info = createInfoElement();

  const lastGames = createLastGamesElement(data.latestResults);

  menuBlock.append(settings, newGameButton);
  mainBlock.append(menuBlock, message, gameField, info, lastGames);
  body.append(title, mainBlock);

  updateField(data);
};

export default firstRender;
