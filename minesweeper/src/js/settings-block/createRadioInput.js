const createRadioInput = (fieldCurSize) => {
  const radioInputBlock = document.createElement("div");
  radioInputBlock.classList.add("radio-input-block");

  const radioInputTitle = document.createElement("h2");
  radioInputTitle.classList.add(
    "settings__title",
    "subtitle",
    "settings__title_radio-input"
  );

  radioInputTitle.innerHTML = `Field size: ${fieldCurSize}`;

  const radioInput = document.createElement("div");
  radioInput.classList.add("radio-input");

  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        const itemLeft = document.createElement("input");
        itemLeft.classList.add("radio-input__input");
        itemLeft.type = "radio";
        itemLeft.name = "size";
        itemLeft.value = "easy";
        itemLeft.checked = fieldCurSize === "easy 10x10" ? true : false;
        radioInput.append(itemLeft);
        break;

      case 1:
        const itemCenter = document.createElement("input");
        itemCenter.classList.add("radio-input__input");
        itemCenter.type = "radio";
        itemCenter.name = "size";
        itemCenter.value = "medium";
        itemCenter.checked = fieldCurSize === "medium 15x15" ? true : false;
        radioInput.append(itemCenter);
        break;

      case 2:
        const itemRight = document.createElement("input");
        itemRight.classList.add("radio-input__input");
        itemRight.type = "radio";
        itemRight.name = "size";
        itemRight.value = "hard";
        itemRight.checked = fieldCurSize === "hard 25x25" ? true : false;
        radioInput.append(itemRight);
        break;
      default:
        break;
    }
  }

  radioInputBlock.append(radioInputTitle, radioInput);
  return radioInputBlock;
};

export default createRadioInput;
