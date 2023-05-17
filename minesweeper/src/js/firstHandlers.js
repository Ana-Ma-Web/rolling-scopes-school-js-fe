import cellHandler from "./handlers/cellHandler";
import radioInputHandler from "./handlers/radioInputHandler";
import rangeArrowsHandler from "./handlers/rangeArrowsHandler";
import rangeInputHandler from "./handlers/rangeInputHandler";
import setMines from "./setMines";
import rerenderField from "./rerenderField";

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
        rerenderField(data);
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
      if (e.target.classList.contains("cell")) {
        if (!data.isCellClicked) {
          setMines(data, e.target.dataset.ij);
          data.isCellClicked = true;
        }
        cellHandler(
          e.target.dataset.ij,
          data.fieldArray,
          data.fieldSize,
          data.isSoundOn
        );
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

  clickHandler();
  keyDownHandler();
};

export default firstHandlers;
