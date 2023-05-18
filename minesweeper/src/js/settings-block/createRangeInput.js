const createRangeInput = (minesNumber) => {
  const rangeInputBlock = document.createElement("div");
  rangeInputBlock.classList.add("range-input-block");

  const rangeInputTitle = document.createElement("h2");
  rangeInputTitle.classList.add(
    "settings__title",
    "subtitle",
    "settings__title_range-input"
  );
  rangeInputTitle.innerHTML = `Choose mines: ${minesNumber}`;

  const arrowLeftBtn = document.createElement("button");
  arrowLeftBtn.classList.add("btn", "btn_line", "range-input__arrow-left");
  arrowLeftBtn.innerHTML = `<svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="path-bg"
      d="M8.5 6.00006L3.68885 1.62624C3.32737 1.29761 3.34548 0.723624 
      3.72697 0.418446V0.418446C4.02912 0.176732 4.4615 0.187961 4.7507 
      0.445032L10.1592 5.25265C10.6067 5.65044 10.6067 6.34968 10.1592 
      6.74747L4.7507 11.555C4.4615 11.812 4.02913 11.8233 3.72698 
      11.5816V11.5816C3.34549 11.2764 3.32738 10.7024 3.68887 
      10.3738L8.5 6.00006Z"
      fill="black"
    />
  </svg>`;

  const arrowRightBtn = document.createElement("button");
  arrowRightBtn.classList.add("btn", "btn_line", "range-input__arrow-right");
  arrowRightBtn.innerHTML = `<svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="path-bg"
      d="M8.5 6.00006L3.68885 1.62624C3.32737 1.29761 3.34548 0.723624 
      3.72697 0.418446V0.418446C4.02912 0.176732 4.4615 0.187961 4.7507 
      0.445032L10.1592 5.25265C10.6067 5.65044 10.6067 6.34968 10.1592 
      6.74747L4.7507 11.555C4.4615 11.812 4.02913 11.8233 3.72698 
      11.5816V11.5816C3.34549 11.2764 3.32738 10.7024 3.68887 10.3738L8.5 
      6.00006Z"
      fill="black"
    />
  </svg>`;

  const rangeInputField = document.createElement("input");
  rangeInputField.classList.add("range-input__field");
  rangeInputField.type = "range";
  rangeInputField.min = 10;
  rangeInputField.max = 99;
  rangeInputField.value = minesNumber;

  const rangeInput = document.createElement("div");
  rangeInput.classList.add("range-input");
  rangeInput.append(arrowLeftBtn, rangeInputField, arrowRightBtn);

  rangeInputBlock.append(rangeInputTitle, rangeInput);
  return rangeInputBlock;
};

export default createRangeInput;
