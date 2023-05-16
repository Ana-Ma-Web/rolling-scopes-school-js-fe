const radioInputHandler = (target, data) => {
  const titleRadioInput = document.querySelector(
    ".settings__title_radio-input"
  );

  switch (target.value) {
    case "easy":
      if (data.fieldSize !== "easy 10x10") {
        data.fieldSize = "easy 10x10";
        titleRadioInput.innerHTML = `Field size: ${data.fieldSize}`;
      }
      break;

    case "medium":
      if (data.fieldSize !== "medium 15x15") {
        data.fieldSize = "medium 15x15";
        titleRadioInput.innerHTML = `Field size: ${data.fieldSize}`;
      }

      break;

    case "hard":
      if (data.fieldSize !== "hard 25x25") {
        data.fieldSize = "hard 25x25";
        titleRadioInput.innerHTML = `Field size: ${data.fieldSize}`;
      }

      break;

    default:
      break;
  }
};

export default radioInputHandler;
