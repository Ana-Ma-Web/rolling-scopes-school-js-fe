const rangeInputHandler = (value, data) => {
  const titleRangeInput = document.querySelector(
    ".settings__title_range-input"
  );
  data.minesNumber = +value;

  titleRangeInput.innerHTML = `Choose mines: ${data.minesNumber}`;
};

export default rangeInputHandler;
