const rangeArrowsHandler = (button, data) => {
  const titleRangeInput = document.querySelector(
    ".settings__title_range-input"
  );
  const rangeInputField = document.querySelector(".range-input__field");

  if (button.classList.contains("range-input__arrow-right")) {
    if (data.minesNumber < 99) {
      data.minesNumber += 1;
      rangeInputField.value = data.minesNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesNumber}`;
    }
  } else {
    if (data.minesNumber > 10) {
      data.minesNumber -= 1;
      rangeInputField.value = data.minesNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesNumber}`;
    }
  }
};

export default rangeArrowsHandler;
