const updateClicks = (clicks) => {
  const targetElement = document.querySelector(".info__clicks");

  targetElement.innerHTML = `Clicks: ${clicks}`;
};

export default updateClicks;
