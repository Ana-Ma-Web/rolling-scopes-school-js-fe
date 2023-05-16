import radioInputHandler from "./handlers/radioInputHandler";
import rangeArrowsHandler from "./handlers/rangeArrowsHandler";
import rangeInputHandler from "./handlers/rangeInputHandler";
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
        rerenderField(data.fieldSize, data.fieldArray);
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
