import cellHandler from "./handlers/cellHandler";
import radioInputHandler from "./handlers/radioInputHandler";
import rangeArrowsHandler from "./handlers/rangeArrowsHandler";
import rangeInputHandler from "./handlers/rangeInputHandler";
import setMines from "./setMines";
import rerenderField from "./rerenderField";
import updateInfoMenu from "./helpers.js/updateInfoMenu";

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
        data.isCellClicked = false;
        data.minesInGameNumber = data.minesCurNumber;
        data.fieldInGameSize = data.fieldCurSize;
        data.openCellCount = 0;
        rerenderField(data);
        updateInfoMenu(
          data.fieldInGameSize,
          data.openCellCount,
          data.minesInGameNumber,
          data.isSoundOn
        );
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
    });
  };

  const keyDownHandler = () => {
    body.addEventListener("input", (e) => {
      if (e.target.classList.contains("range-input__field")) {
        rangeInputHandler(e.target.value, data);
      }
    });
  };

  const rightClickHandler = () => {
    body.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        if (e.target.classList.contains("cell")) {
          e.target.classList.toggle("cell_flag");
        }
      },
      false
    );
  };

  clickHandler();
  keyDownHandler();
  rightClickHandler();
};

export default firstHandlers;
