import createRadioInput from "./createRadioInput";
import createRangeInput from "./createRangeInput";

const createSettingsElement = (minesNumber, fieldCurSize) => {
  const settings = document.createElement("div");
  settings.classList.add("settings");

  settings.append(
    createRangeInput(minesNumber),
    createRadioInput(fieldCurSize)
  );

  return settings;
};

export default createSettingsElement;
