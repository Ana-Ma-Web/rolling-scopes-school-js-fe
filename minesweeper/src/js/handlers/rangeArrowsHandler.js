const rangeArrowsHandler = (button, data) => {
  const titleRangeInput = document.querySelector(
    ".settings__title_range-input"
  );
  const rangeInputField = document.querySelector(".range-input__field");

  if (button.classList.contains("range-input__arrow-right")) {
    if (data.minesCurNumber < 99) {
      data.minesCurNumber += 1;
      rangeInputField.value = data.minesCurNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
    }
  } else {
    if (data.minesCurNumber > 10) {
      data.minesCurNumber -= 1;
      rangeInputField.value = data.minesCurNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
    }
  }
};

export default rangeArrowsHandler;
