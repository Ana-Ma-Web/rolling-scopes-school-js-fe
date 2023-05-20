import data from "../data/data";
import createLastGamesElement from "./createLastGamesElement";

const updateLastGames = () => {
  const targetBlock = document.querySelector(".last-games");

  targetBlock.replaceWith(createLastGamesElement(data.latestResults));
};

export default updateLastGames;
