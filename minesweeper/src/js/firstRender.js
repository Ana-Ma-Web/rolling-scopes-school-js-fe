import countTime from "./info-block/countTime";
import createFieldElement from "./cell-field-block/createFieldElement";
import createLastGamesElement from "./latest-results-block/createLastGamesElement";
import createInfoElement from "./info-block/createInfoElement";
import createSettingsElement from "./settings-block/createSettingsElement";

const firstRender = (data) => {
  const body = document.querySelector("body");
  if (data.isDarkTheme) body.classList.add("dark-theme");
  body.innerHTML = "";

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = "Minesweeper";

  const settings = createSettingsElement(
    data.minesCurNumber,
    data.fieldCurSize
  );
  const newGameButton = document.createElement("button");
  newGameButton.classList.add("btn", "btn_new-game");
  newGameButton.innerHTML = "Start new game";

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

  body.append(
    title,
    settings,
    newGameButton,
    info,
    createFieldElement(data),
    lastGames
  );
};

export default firstRender;
