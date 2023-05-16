const rangeInputHandler = (value, data) => {
  const titleRangeInput = document.querySelector(
    ".settings__title_range-input"
  );
  data.minesCurNumber = +value;

  titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
};

export default rangeInputHandler;
