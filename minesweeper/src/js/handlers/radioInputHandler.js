const radioInputHandler = (target, data) => {
  const titleRadioInput = document.querySelector(
    ".settings__title_radio-input"
  );

  switch (target.value) {
    case "easy":
      if (data.fieldCurSize !== "easy 10x10") {
        data.fieldCurSize = "easy 10x10";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }
      break;

    case "medium":
      if (data.fieldCurSize !== "medium 15x15") {
        data.fieldCurSize = "medium 15x15";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }

      break;

    case "hard":
      if (data.fieldCurSize !== "hard 25x25") {
        data.fieldCurSize = "hard 25x25";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }

      break;

    default:
      break;
  }
};

export default radioInputHandler;
