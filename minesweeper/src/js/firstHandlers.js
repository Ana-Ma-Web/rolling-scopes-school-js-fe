import cellHandler from "./handlers/cellHandler";
import radioInputHandler from "./handlers/radioInputHandler";
import rangeArrowsHandler from "./handlers/rangeArrowsHandler";
import rangeInputHandler from "./handlers/rangeInputHandler";
import setMines from "./cell-field-block/setMines";
import updateInfoMenu from "./info-block/updateInfoMenu";
import updateLocalStorage from "./updateLocalStorage";
import soundAudio from "./soundAudio";
import updateField from "./cell-field-block/updateField";
import createDefaultCells from "./data/createDefaultCells";
import startNewGameHandler from "./handlers/startNewGameHandler";

const firstHandlers = (data) => {
  const body = document.querySelector("body");

  const clickHandler = () => {
    body.addEventListener("click", (e) => {
      // input range
      if (
        e.target
          .closest("button")
          ?.classList.contains("range-input__arrow-left") ||
        e.target
          .closest("button")
          ?.classList.contains("range-input__arrow-right")
      ) {
        rangeArrowsHandler(e.target.closest("button"), data);
      }

      // input radio
      if (e.target.classList.contains("radio-input__input")) {
        radioInputHandler(e.target, data);
      }

      // new game
      if (e.target.classList.contains("btn_new-game")) {
        startNewGameHandler(data);
      }

      // volume
      if (e.target.closest(".btn_volume")) {
        data.isSoundOn = !data.isSoundOn;
        e.target.closest(".btn_volume").classList.toggle("btn_active");
      }

      // theme
      if (e.target.closest(".btn_theme")) {
        data.isDarkTheme = !data.isDarkTheme;
        body.classList.toggle("dark-theme");
        e.target.closest(".btn_theme").classList.toggle("btn_active");
      }

      //cells
      if (!data.isDisabled) {
        if (
          e.target.classList.contains("cell") &&
          !e.target.classList.contains("cell_flag")
        ) {
          if (!data.isCellClicked) {
            setMines(data, e.target.dataset.ij);
            data.isCellClicked = true;
          }
          cellHandler(e.target.dataset.ij, data);
        }
      }

      updateLocalStorage();
    });
  };

  const keyDownHandler = () => {
    body.addEventListener("input", (e) => {
      if (e.target.classList.contains("range-input__field")) {
        rangeInputHandler(e.target.value, data);
      }
      updateLocalStorage();
    });
  };

  const rightClickHandler = () => {
    body.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        if (e.target.classList.contains("cell")) {
          if (!data.isDisabled) {
            const ijArr = e.target.dataset.ij.split("-");
            const x = +ijArr[0];
            const y = +ijArr[1];
            data.cellsAtField[x][y].isFlag = !data.cellsAtField[x][y].isFlag;
            e.target.classList.toggle("cell_flag");
            soundAudio(false, data.isSoundOn);
          }
        }
        updateLocalStorage();
      },
      false
    );
  };

  clickHandler();
  keyDownHandler();
  rightClickHandler();
};

export default firstHandlers;
